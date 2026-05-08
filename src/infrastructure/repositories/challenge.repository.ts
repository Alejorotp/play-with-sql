import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Challenge } from '../../domain/entities/challenge.entity';
import { IChallengeRepository } from '../../domain/repositories/challenge.repository.interface';
import { ChallengeStatus } from '../../domain/enums/challenge-status.enum';

@Injectable()
export class ChallengeRepository implements IChallengeRepository {
  constructor(@InjectRepository(Challenge) private readonly repository: Repository<Challenge>) {}

  async create(challenge: Challenge): Promise<Challenge> {
    return this.repository.save(challenge);
  }

  async findById(id: string): Promise<Challenge | null> {
    return this.repository.findOne({ where: { id } });
  }

  async findAll(): Promise<Challenge[]> {
    return this.repository.find({ where: { status: ChallengeStatus.PUBLISHED } });
  }

  async findByCourse(courseId: string): Promise<Challenge[]> {
    return this.repository.find({ where: { courseId } });
  }

  async update(id: string, challenge: Partial<Challenge>): Promise<Challenge> {
    await this.repository.update(id, challenge);
    return this.repository.findOneOrFail({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.repository.update(id, { status: ChallengeStatus.ARCHIVED });
  }
}
