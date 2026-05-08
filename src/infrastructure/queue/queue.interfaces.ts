import { ConnectionOptions } from 'tls';

export interface QueueRedisOptions {
  host: string;
  port: number;
  username?: string;
  password?: string;
  db?: number;
  tls?: ConnectionOptions;
}

export interface QueueModuleOptions {
  connection: QueueRedisOptions;
  queueName?: string;
  prefix?: string;
}
