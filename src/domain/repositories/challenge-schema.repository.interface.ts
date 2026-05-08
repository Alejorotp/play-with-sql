import { ChallengeSchema } from '../entities/challenge-schema.entity';

export interface IChallengeSchemaRepository {
  create(schema: ChallengeSchema): Promise<ChallengeSchema>;
  findByChallenge(challengeId: string): Promise<ChallengeSchema | null>;
  update(id: string, schema: Partial<ChallengeSchema>): Promise<ChallengeSchema>;
}
