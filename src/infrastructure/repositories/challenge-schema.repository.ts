import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChallengeSchema } from '../../domain/entities/challenge-schema.entity';
import { IChallengeSchemaRepository } from '../../domain/repositories/challenge-schema.repository.interface';

@Injectable()
export class ChallengeSchemaRepository implements IChallengeSchemaRepository {
  constructor(@InjectRepository(ChallengeSchema) private readonly repository: Repository<ChallengeSchema>) {}

  async create(schema: ChallengeSchema): Promise<ChallengeSchema> {
    return this.repository.save(schema);
  }

  async findByChallenge(challengeId: string): Promise<ChallengeSchema | null> {
    return this.repository.findOne({ where: { challengeId } });
  }

  async update(id: string, schema: Partial<ChallengeSchema>): Promise<ChallengeSchema> {
    await this.repository.update(id, schema);
    return this.repository.findOneOrFail({ where: { id } });
  }
}
