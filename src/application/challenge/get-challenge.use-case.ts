import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Challenge } from '../../domain/entities/challenge.entity';
import type { IChallengeRepository } from '../../domain/repositories/challenge.repository.interface';

@Injectable()
export class GetChallengeUseCase {
  constructor(@Inject('IChallengeRepository') private readonly challengeRepository: IChallengeRepository) {}

  async execute(id: string): Promise<Challenge> {
    const challenge = await this.challengeRepository.findById(id);
    if (!challenge) {
      throw new NotFoundException(`Challenge with ID ${id} not found`);
    }
    return challenge;
  }
}
