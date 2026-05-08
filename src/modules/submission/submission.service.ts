import { Injectable } from '@nestjs/common';
import { CreateSubmissionUseCase } from '../../application/submission/create-submission.use-case';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { SubmissionResponseDto } from './dto/submission-response.dto';

@Injectable()
export class SubmissionService {
  constructor(private readonly createSubmissionUseCase: CreateSubmissionUseCase) {}

  async create(
    createSubmissionDto: CreateSubmissionDto,
    studentId: string,
  ): Promise<SubmissionResponseDto> {
    const submission = await this.createSubmissionUseCase.execute(
      createSubmissionDto,
      studentId,
    );

    return this.toResponseDto(submission);
  }

  private toResponseDto(submission: any): SubmissionResponseDto {
    return {
      id: submission.id,
      studentId: submission.studentId,
      challengeId: submission.challengeId,
      query: submission.query,
      engine: submission.engine,
      status: submission.status,
      createdAt: submission.createdAt,
    };
  }
}
