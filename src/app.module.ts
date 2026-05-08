import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './infrastructure/database/database.module';
import { QueueModule } from './infrastructure/queue/queue.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { CourseModule } from './modules/course/course.module';
import { ChallengeModule } from './modules/challenge/challenge.module';
import { SubmissionModule } from './modules/submission/submission.module';
import { WorkerModule } from './modules/worker/worker.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, QueueModule, AuthModule, UserModule, CourseModule, ChallengeModule, SubmissionModule, WorkerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
