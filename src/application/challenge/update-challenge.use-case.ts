import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Challenge } from '../../domain/entities/challenge.entity';
import type { IChallengeRepository } from '../../domain/repositories/challenge.repository.interface';
import { UpdateChallengeDto } from '../../modules/challenge/dto/update-challenge.dto';

@Injectable()
export class UpdateChallengeUseCase {
  constructor(@Inject('IChallengeRepository') private readonly challengeRepository: IChallengeRepository) {}

  async execute(id: string, dto: UpdateChallengeDto): Promise<Challenge> {
    const challenge = await this.challengeRepository.findById(id);
    if (!challenge) {
      throw new NotFoundException(`Challenge with ID ${id} not found`);
    }
    return this.challengeRepository.update(id, dto);
  }
}
