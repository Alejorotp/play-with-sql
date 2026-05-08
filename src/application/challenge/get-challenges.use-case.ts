import { Injectable, Inject } from '@nestjs/common';
import { Challenge } from '../../domain/entities/challenge.entity';
import type { IChallengeRepository } from '../../domain/repositories/challenge.repository.interface';

@Injectable()
export class GetChallengesUseCase {
  constructor(@Inject('IChallengeRepository') private readonly challengeRepository: IChallengeRepository) {}

  async execute(courseId?: string): Promise<Challenge[]> {
    if (courseId) {
      return this.challengeRepository.findByCourse(courseId);
    }
    return this.challengeRepository.findAll();
  }
}
