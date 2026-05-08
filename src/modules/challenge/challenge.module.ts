import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Challenge } from '../../domain/entities/challenge.entity';
import { ChallengeSchema } from '../../domain/entities/challenge-schema.entity';
import { ChallengeRepository } from '../../infrastructure/repositories/challenge.repository';
import { ChallengeSchemaRepository } from '../../infrastructure/repositories/challenge-schema.repository';
import { CreateChallengeUseCase } from '../../application/challenge/create-challenge.use-case';
import { GetChallengeUseCase } from '../../application/challenge/get-challenge.use-case';
import { GetChallengesUseCase } from '../../application/challenge/get-challenges.use-case';
import { UpdateChallengeUseCase } from '../../application/challenge/update-challenge.use-case';
import { DeleteChallengeUseCase } from '../../application/challenge/delete-challenge.use-case';
import { AddChallengeSchemaUseCase } from '../../application/challenge/add-challenge-schema.use-case';
import { ChallengeService } from './challenge.service';
import { ChallengeController } from './challenge.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Challenge, ChallengeSchema])],
  providers: [
    { provide: 'IChallengeRepository', useClass: ChallengeRepository },
    { provide: 'IChallengeSchemaRepository', useClass: ChallengeSchemaRepository },
    CreateChallengeUseCase,
    GetChallengeUseCase,
    GetChallengesUseCase,
    UpdateChallengeUseCase,
    DeleteChallengeUseCase,
    AddChallengeSchemaUseCase,
    ChallengeService,
  ],
  controllers: [ChallengeController],
  exports: ['IChallengeRepository', 'IChallengeSchemaRepository'],
})
export class ChallengeModule {}
