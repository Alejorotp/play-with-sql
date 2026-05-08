import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { SubmissionStatus } from '../enums/submission-status.enum';
import { User } from './user.entity';
import { Challenge } from './challenge.entity';

@Entity('submissions')
export class Submission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  studentId: string;

  @Column({ type: 'uuid' })
  challengeId: string;

  @Column({ type: 'text' })
  query: string;

  @Column({ type: 'varchar', length: 30, default: 'postgresql' })
  engine: string;

  @Column({ type: 'enum', enum: SubmissionStatus, default: SubmissionStatus.QUEUED })
  status: SubmissionStatus;

  @Column({ type: 'jsonb', nullable: true })
  result: Record<string, any> | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'studentId' })
  student: User;

  @ManyToOne(() => Challenge, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'challengeId' })
  challenge: Challenge;
}
