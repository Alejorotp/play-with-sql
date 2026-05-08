import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { ChallengeSchema } from '../../domain/entities/challenge-schema.entity';
import type { IChallengeRepository } from '../../domain/repositories/challenge.repository.interface';
import type { IChallengeSchemaRepository } from '../../domain/repositories/challenge-schema.repository.interface';
import { AddChallengeSchemaDto } from '../../modules/challenge/dto/add-challenge-schema.dto';

@Injectable()
export class AddChallengeSchemaUseCase {
  constructor(
    @Inject('IChallengeRepository') private readonly challengeRepository: IChallengeRepository,
    @Inject('IChallengeSchemaRepository') private readonly schemaRepository: IChallengeSchemaRepository,
  ) {}

  async execute(challengeId: string, dto: AddChallengeSchemaDto): Promise<ChallengeSchema> {
    const challenge = await this.challengeRepository.findById(challengeId);
    if (!challenge) {
      throw new NotFoundException(`Challenge with ID ${challengeId} not found`);
    }

    const existingSchema = await this.schemaRepository.findByChallenge(challengeId);
    if (existingSchema) {
      existingSchema.ddlScript = dto.ddlScript;
      existingSchema.seedDataScript = dto.seedDataScript;
      existingSchema.generatorConfig = dto.generatorConfig;
      existingSchema.version += 1;
      return this.schemaRepository.update(existingSchema.id, existingSchema);
    }

    const schema = new ChallengeSchema();
    schema.challengeId = challengeId;
    schema.ddlScript = dto.ddlScript;
    schema.seedDataScript = dto.seedDataScript;
    schema.generatorConfig = dto.generatorConfig;
    schema.version = 1;

    return this.schemaRepository.create(schema);
  }
}
