import { ApiProperty } from '@nestjs/swagger';
import { Difficulty } from '../../../domain/enums/difficulty.enum';
import { ChallengeStatus } from '../../../domain/enums/challenge-status.enum';

export class ChallengeResponseDto {
  @ApiProperty({ description: 'Challenge ID' })
  id: string;

  @ApiProperty({ description: 'Course ID' })
  courseId: string;

  @ApiProperty({ description: 'Creator User ID' })
  createdBy: string;

  @ApiProperty({ description: 'Challenge title' })
  title: string;

  @ApiProperty({ description: 'Challenge description' })
  description: string;

  @ApiProperty({ description: 'Difficulty level', enum: Difficulty })
  difficulty: Difficulty;

  @ApiProperty({ description: 'Tags' })
  tags: string[];

  @ApiProperty({ description: 'Database engine' })
  databaseEngine: string;

  @ApiProperty({ description: 'Time limit in minutes' })
  timeLimit: number;

  @ApiProperty({ description: 'Challenge status', enum: ChallengeStatus })
  status: ChallengeStatus;

  @ApiProperty({ description: 'Creation date' })
  createdAt: Date;
}
