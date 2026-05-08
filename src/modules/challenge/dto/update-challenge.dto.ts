import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateChallengeDto } from './create-challenge.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { ChallengeStatus } from '../../../domain/enums/challenge-status.enum';

export class UpdateChallengeDto extends PartialType(CreateChallengeDto) {
  @ApiProperty({ description: 'Status of the challenge', enum: ChallengeStatus, example: ChallengeStatus.PUBLISHED, required: false })
  @IsEnum(ChallengeStatus)
  @IsOptional()
  status?: ChallengeStatus;
}
