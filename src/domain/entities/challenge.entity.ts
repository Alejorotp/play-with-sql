import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Course } from './course.entity';
import { User } from './user.entity';
import { Difficulty } from '../enums/difficulty.enum';
import { ChallengeStatus } from '../enums/challenge-status.enum';

@Entity('challenges')
export class Challenge {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  courseId: string;

  @ManyToOne(() => Course)
  @JoinColumn({ name: 'courseId' })
  course: Course;

  @Column({ type: 'uuid' })
  createdBy: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'createdBy' })
  creator: User;

  @Column({ type: 'varchar', length: 200 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'enum', enum: Difficulty })
  difficulty: Difficulty;

  @Column({ type: 'text', array: true })
  tags: string[];

  @Column({ type: 'varchar', length: 30 })
  databaseEngine: string;

  @Column({ type: 'int' })
  timeLimit: number;

  @Column({ type: 'enum', enum: ChallengeStatus })
  status: ChallengeStatus;

  @CreateDateColumn()
  createdAt: Date;

  
}