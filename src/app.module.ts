import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './infrastructure/database/database.module';
import { QueueModule } from './infrastructure/queue/queue.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { CourseModule } from './modules/course/course.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, QueueModule, AuthModule, UserModule, CourseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
