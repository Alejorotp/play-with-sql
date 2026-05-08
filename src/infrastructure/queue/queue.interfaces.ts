export interface QueueRedisOptions {
  host: string;
  port: number;
  username?: string;
  password?: string;
  db?: number;
  tls?: boolean;
}

export interface QueueModuleOptions {
  connection: QueueRedisOptions;
  queueName?: string;
  prefix?: string;
}

export interface QueueConnectionConfig {
  queueName: string;
  prefix: string;
  connection: QueueRedisOptions;
}