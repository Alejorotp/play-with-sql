import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bullmq';
import { SQL_SUBMISSIONS_QUEUE_NAME } from './queue.constants';

@Module({
  imports: [
    ConfigModule,
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        connection: {
          host: configService.get<string>('REDIS_HOST', 'localhost'),
          port: parseInt(configService.get<string>('REDIS_PORT', '6379'), 10),
          username: configService.get<string>('REDIS_USERNAME'),
          password: configService.get<string>('REDIS_PASSWORD'),
          db: parseInt(configService.get<string>('REDIS_DB', '0'), 10),
        },
        prefix: configService.get<string>('REDIS_PREFIX', 'play-with-sql'),
      }),
    }),
    BullModule.registerQueue({
      name: SQL_SUBMISSIONS_QUEUE_NAME,
    }),
  ],
  exports: [BullModule],
})
export class QueueModule {}