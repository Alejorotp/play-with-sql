import { Injectable } from '@nestjs/common';
import { CreateChallengeUseCase } from '../../application/challenge/create-challenge.use-case';
import { GetChallengeUseCase } from '../../application/challenge/get-challenge.use-case';
import { GetChallengesUseCase } from '../../application/challenge/get-challenges.use-case';
import { UpdateChallengeUseCase } from '../../application/challenge/update-challenge.use-case';
import { DeleteChallengeUseCase } from '../../application/challenge/delete-challenge.use-case';
import { AddChallengeSchemaUseCase } from '../../application/challenge/add-challenge-schema.use-case';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { ChallengeResponseDto } from './dto/challenge-response.dto';
import { AddChallengeSchemaDto } from './dto/add-challenge-schema.dto';
import { ChallengeSchemaResponseDto } from './dto/challenge-schema-response.dto';

@Injectable()
export class ChallengeService {
  constructor(
    private readonly createChallengeUseCase: CreateChallengeUseCase,
    private readonly getChallengeUseCase: GetChallengeUseCase,
    private readonly getChallengesUseCase: GetChallengesUseCase,
    private readonly updateChallengeUseCase: UpdateChallengeUseCase,
    private readonly deleteChallengeUseCase: DeleteChallengeUseCase,
    private readonly addChallengeSchemaUseCase: AddChallengeSchemaUseCase,
  ) {}

  async create(creatorId: string, dto: CreateChallengeDto): Promise<ChallengeResponseDto> {
    const challenge = await this.createChallengeUseCase.execute(creatorId, dto);
    return this.mapToChallengeResponseDto(challenge);
  }

  async findById(id: string): Promise<ChallengeResponseDto> {
    const challenge = await this.getChallengeUseCase.execute(id);
    return this.mapToChallengeResponseDto(challenge);
  }

  async findAll(courseId?: string): Promise<ChallengeResponseDto[]> {
    const challenges = await this.getChallengesUseCase.execute(courseId);
    return challenges.map(c => this.mapToChallengeResponseDto(c));
  }

  async update(id: string, dto: UpdateChallengeDto): Promise<ChallengeResponseDto> {
    const challenge = await this.updateChallengeUseCase.execute(id, dto);
    return this.mapToChallengeResponseDto(challenge);
  }

  async delete(id: string): Promise<void> {
    await this.deleteChallengeUseCase.execute(id);
  }

  async addSchema(challengeId: string, dto: AddChallengeSchemaDto): Promise<ChallengeSchemaResponseDto> {
    const schema = await this.addChallengeSchemaUseCase.execute(challengeId, dto);
    return {
      id: schema.id,
      challengeId: schema.challengeId,
      ddlScript: schema.ddlScript,
      seedDataScript: schema.seedDataScript,
      generatorConfig: schema.generatorConfig,
      version: schema.version,
    };
  }

  private mapToChallengeResponseDto(challenge: any): ChallengeResponseDto {
    return {
      id: challenge.id,
      courseId: challenge.courseId,
      createdBy: challenge.createdBy,
      title: challenge.title,
      description: challenge.description,
      difficulty: challenge.difficulty,
      tags: challenge.tags,
      databaseEngine: challenge.databaseEngine,
      timeLimit: challenge.timeLimit,
      status: challenge.status,
      createdAt: challenge.createdAt,
    };
  }
}
