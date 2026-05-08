import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourseEnrollment } from '../../domain/entities/course-enrollment.entity';
import { ICourseEnrollmentRepository } from '../../domain/repositories/course-enrollment.repository.interface';

@Injectable()
export class CourseEnrollmentRepository implements ICourseEnrollmentRepository {
  constructor(@InjectRepository(CourseEnrollment) private readonly repository: Repository<CourseEnrollment>) {}

  async create(enrollment: CourseEnrollment): Promise<CourseEnrollment> {
    return this.repository.save(enrollment);
  }

  async findByCourseAndStudent(courseId: string, studentId: string): Promise<CourseEnrollment | null> {
    return this.repository.findOne({ where: { courseId, studentId } });
  }

  async findByCourse(courseId: string): Promise<CourseEnrollment[]> {
    return this.repository.find({ where: { courseId } });
  }

  async findByStudent(studentId: string): Promise<CourseEnrollment[]> {
    return this.repository.find({ where: { studentId } });
  }

  async delete(courseId: string, studentId: string): Promise<void> {
    await this.repository.delete({ courseId, studentId });
  }
}
