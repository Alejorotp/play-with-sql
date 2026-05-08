import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import type { IChallengeRepository } from '../../domain/repositories/challenge.repository.interface';

@Injectable()
export class DeleteChallengeUseCase {
  constructor(@Inject('IChallengeRepository') private readonly challengeRepository: IChallengeRepository) {}

  async execute(id: string): Promise<void> {
    const challenge = await this.challengeRepository.findById(id);
    if (!challenge) {
      throw new NotFoundException(`Challenge with ID ${id} not found`);
    }
    await this.challengeRepository.delete(id);
  }
}
