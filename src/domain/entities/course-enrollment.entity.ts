import { Entity, PrimaryColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Course } from './course.entity';
import { EnrollmentStatus } from '../enums/enrollment-status.enum';

@Entity('course_enrollments')
export class CourseEnrollment {
  @PrimaryColumn({ type: 'uuid' })
  courseId: string;

  @PrimaryColumn({ type: 'uuid' })
  studentId: string;

  @ManyToOne(() => Course)
  @JoinColumn({ name: 'courseId' })
  course: Course;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'studentId' })
  student: User;

  @CreateDateColumn()
  enrolledAt: Date;

  @Column({ type: 'enum', enum: EnrollmentStatus })
  status: EnrollmentStatus;

}