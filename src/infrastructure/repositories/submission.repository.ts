import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Submission } from '../../domain/entities/submission.entity';
import { ISubmissionRepository } from '../../domain/repositories/submission.repository.interface';

@Injectable()
export class SubmissionRepository implements ISubmissionRepository {
  constructor(
    @InjectRepository(Submission)
    private readonly repository: Repository<Submission>,
  ) {}

  async create(submission: Partial<Submission>): Promise<Submission> {
    const entity = this.repository.create(submission);
    return this.repository.save(entity);
  }

  async findById(id: string): Promise<Submission | null> {
    return this.repository.findOne({ where: { id } });
  }

  async findByStudentAndChallenge(studentId: string, challengeId: string): Promise<Submission[]> {
    return this.repository.find({ where: { studentId, challengeId } });
  }

  async findByChallengeId(challengeId: string): Promise<Submission[]> {
    return this.repository.find({ where: { challengeId } });
  }

  async update(id: string, submission: Partial<Submission>): Promise<Submission> {
    await this.repository.update(id, submission);
    const updated = await this.repository.findOne({ where: { id } });
    return updated!;
  }
}
