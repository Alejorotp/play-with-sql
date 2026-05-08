import { Submission } from '../entities/submission.entity';

export interface ISubmissionRepository {
  create(submission: Partial<Submission>): Promise<Submission>;
  findById(id: string): Promise<Submission | null>;
  findByStudentAndChallenge(studentId: string, challengeId: string): Promise<Submission[]>;
  findByChallengeId(challengeId: string): Promise<Submission[]>;
  update(id: string, submission: Partial<Submission>): Promise<Submission>;
}
