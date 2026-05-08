import { ApiProperty } from '@nestjs/swagger';
import { SubmissionStatus } from '../../../domain/enums/submission-status.enum';

export class SubmissionResponseDto {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d' })
  id!: string;

  @ApiProperty({ example: 'f1e2d3c4-b5a6-4d7e-8f9a-0b1c2d3e4f5a' })
  studentId!: string;

  @ApiProperty({ example: 'd4c3b2a1-f6e5-4c5d-8a9b-1e2d3f4a5b6c' })
  challengeId!: string;

  @ApiProperty({ example: 'SELECT * FROM users WHERE id = 1' })
  query!: string;

  @ApiProperty({ example: 'postgresql' })
  engine!: string;

  @ApiProperty({ enum: SubmissionStatus, example: SubmissionStatus.QUEUED })
  status!: SubmissionStatus;

  @ApiProperty({ example: '2026-05-08T12:00:00Z' })
  createdAt!: Date;
}
