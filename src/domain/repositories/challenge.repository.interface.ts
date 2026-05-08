import { Challenge } from '../entities/challenge.entity';

export interface IChallengeRepository {
  create(challenge: Challenge): Promise<Challenge>;
  findById(id: string): Promise<Challenge | null>;
  findAll(): Promise<Challenge[]>;
  findByCourse(courseId: string): Promise<Challenge[]>;
  update(id: string, challenge: Partial<Challenge>): Promise<Challenge>;
  delete(id: string): Promise<void>;
}
