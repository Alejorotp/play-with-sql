import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Challenge } from './challenge.entity';

@Entity('challenge_schemas')
export class ChallengeSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  challengeId: string;

  @ManyToOne(() => Challenge)
  @JoinColumn({ name: 'challengeId' })
  challenge: Challenge;

  @Column({ type: 'text' })
  ddlScript: string;

  @Column({ type: 'text' })
  seedDataScript: string;

  @Column({ type: 'jsonb' })
  generatorConfig: any;

  @Column({ type: 'int', default: 1 })
  version: number;

  
}