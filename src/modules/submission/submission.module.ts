import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Submission } from '../../domain/entities/submission.entity';
import { SubmissionRepository } from '../../infrastructure/repositories/submission.repository';
import { CreateSubmissionUseCase } from '../../application/submission/create-submission.use-case';
import { SubmissionService } from './submission.service';
import { SubmissionController } from './submission.controller';
import { QueueModule } from '../../infrastructure/queue/queue.module';
import { ChallengeModule } from '../challenge/challenge.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Submission]),
    QueueModule,
    ChallengeModule,
  ],
  providers: [
    {
      provide: 'ISubmissionRepository',
      useClass: SubmissionRepository,
    },
    CreateSubmissionUseCase,
    SubmissionService,
  ],
  controllers: [SubmissionController],
  exports: ['ISubmissionRepository'],
})
export class SubmissionModule {}
