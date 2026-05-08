import { Injectable, Inject } from '@nestjs/common';
import { Challenge } from '../../domain/entities/challenge.entity';
import type { IChallengeRepository } from '../../domain/repositories/challenge.repository.interface';
import { CreateChallengeDto } from '../../modules/challenge/dto/create-challenge.dto';
import { ChallengeStatus } from '../../domain/enums/challenge-status.enum';

@Injectable()
export class CreateChallengeUseCase {
  constructor(@Inject('IChallengeRepository') private readonly challengeRepository: IChallengeRepository) {}

  async execute(creatorId: string, dto: CreateChallengeDto): Promise<Challenge> {
    const challenge = new Challenge();
    challenge.courseId = dto.courseId;
    challenge.createdBy = creatorId;
    challenge.title = dto.title;
    challenge.description = dto.description;
    challenge.difficulty = dto.difficulty;
    challenge.tags = dto.tags;
    challenge.databaseEngine = dto.databaseEngine;
    challenge.timeLimit = dto.timeLimit;
    challenge.status = ChallengeStatus.DRAFT;
    challenge.createdAt = new Date();

    return this.challengeRepository.create(challenge);
  }
}
