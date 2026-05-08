import { DynamicModule, Global, Module } from '@nestjs/common';
import {
  QUEUE_CONNECTION,
  QUEUE_MODULE_OPTIONS,
  SQL_SUBMISSIONS_QUEUE_NAME,
} from './queue.constants';
import {
  QueueConnectionConfig,
  QueueModuleOptions,
} from './queue.interfaces';

function createQueueConnectionConfig(
  options: QueueModuleOptions,
): QueueConnectionConfig {
  return {
    queueName: options.queueName ?? SQL_SUBMISSIONS_QUEUE_NAME,
    prefix: options.prefix ?? 'play-with-sql',
    connection: options.connection,
  };
}

@Global()
@Module({})
export class QueueModule {
  static register(options: QueueModuleOptions): DynamicModule {
    const connectionConfig = createQueueConnectionConfig(options);

    return {
      module: QueueModule,
      global: true,
      providers: [
        {
          provide: QUEUE_MODULE_OPTIONS,
          useValue: options,
        },
        {
          provide: QUEUE_CONNECTION,
          useValue: connectionConfig,
        },
      ],
      exports: [QUEUE_MODULE_OPTIONS, QUEUE_CONNECTION],
    };
  }
}