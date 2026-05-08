import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { SqlSubmissionsConsumer } from '../../infrastructure/queue/sql-submissions.consumer';
import { SQL_SUBMISSIONS_QUEUE_NAME } from '../../infrastructure/queue/queue.constants';

@Module({
  imports: [
    BullModule.registerQueue({
      name: SQL_SUBMISSIONS_QUEUE_NAME,
    }),
  ],
  providers: [SqlSubmissionsConsumer],
})
export class WorkerModule {}
