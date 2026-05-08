import { Inject, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import type { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';
import type { ISubmissionRepository } from '../../domain/repositories/submission.repository.interface';
import { SQL_SUBMISSIONS_QUEUE_NAME } from '../../infrastructure/queue/queue.constants';
import { Submission } from '../../domain/entities/submission.entity';
import { SubmissionStatus } from '../../domain/enums/submission-status.enum';
import { ChallengeStatus } from '../../domain/enums/challenge-status.enum';
import { CreateSubmissionDto } from '../../modules/submission/dto/create-submission.dto';
import type { IChallengeRepository } from '../../domain/repositories/challenge.repository.interface';

@Injectable()
export class CreateSubmissionUseCase {
  constructor(
    @Inject('ISubmissionRepository')
    private readonly submissionRepository: ISubmissionRepository,
    @Inject('IChallengeRepository')
    private readonly challengeRepository: IChallengeRepository,
    @InjectQueue(SQL_SUBMISSIONS_QUEUE_NAME)
    private readonly queue: Queue,
  ) {}

  async execute(
    createSubmissionDto: CreateSubmissionDto,
    studentId: string,
  ): Promise<Submission> {
    const challenge = await this.challengeRepository.findById(createSubmissionDto.challengeId);
    if (!challenge) {
      throw new NotFoundException('Challenge not found');
    }

    if (challenge.status !== ChallengeStatus.PUBLISHED) {
      throw new BadRequestException('Challenge is not published');
    }

    const submission = await this.submissionRepository.create({
      studentId,
      challengeId: createSubmissionDto.challengeId,
      query: createSubmissionDto.query,
      engine: createSubmissionDto.engine ?? 'postgresql',
      status: SubmissionStatus.QUEUED,
      result: null,
    });

    await this.queue.add(SQL_SUBMISSIONS_QUEUE_NAME, {
      submissionId: submission.id,
      studentId: submission.studentId,
      challengeId: submission.challengeId,
      query: submission.query,
    });

    return submission;
  }
}
