import { Injectable } from '@nestjs/common';
import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { SQL_SUBMISSIONS_QUEUE_NAME } from './queue.constants';

@Processor(SQL_SUBMISSIONS_QUEUE_NAME)
@Injectable()
export class SqlSubmissionsConsumer extends WorkerHost {
  async process(job: Job): Promise<void> {
    console.log(`[Worker] Processing submission job ${job.id}:`, job.data);
    console.log(`[Worker] Submission Data:`, {
      submissionId: job.data.submissionId,
      studentId: job.data.studentId,
      challengeId: job.data.challengeId,
      query: job.data.query,
      engine: job.data.engine,
    });
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job): void {
    console.log(`[Worker] Submission job ${job.id} completed`);
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job, error: Error): void {
    console.error(`[Worker] Submission job ${job?.id} failed:`, error.message);
  }
}