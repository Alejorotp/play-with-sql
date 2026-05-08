import type { ICourseRepository } from '../../domain/repositories/course.repository.interface';
import type { ICourseEnrollmentRepository } from '../../domain/repositories/course-enrollment.repository.interface';
import { Injectable, BadRequestException, NotFoundException, Inject } from '@nestjs/common';
import { CourseEnrollment } from '../../domain/entities/course-enrollment.entity';
import { EnrollmentStatus } from '../../domain/enums/enrollment-status.enum';

@Injectable()
export class EnrollStudentUseCase {
  constructor(
    @Inject('ICourseRepository') private readonly courseRepository: ICourseRepository,
    @Inject('ICourseEnrollmentRepository') private readonly enrollmentRepository: ICourseEnrollmentRepository,
  ) {}

  async execute(courseId: string, studentId: string): Promise<CourseEnrollment> {
    const course = await this.courseRepository.findById(courseId);
    if (!course) {
      throw new NotFoundException(`Course with ID ${courseId} not found`);
    }

    const existingEnrollment = await this.enrollmentRepository.findByCourseAndStudent(courseId, studentId);
    if (existingEnrollment) {
      throw new BadRequestException(`Student is already enrolled in this course`);
    }

    const enrollment = new CourseEnrollment();
    enrollment.courseId = courseId;
    enrollment.studentId = studentId;
    enrollment.course = course;
    enrollment.enrolledAt = new Date();
    enrollment.status = EnrollmentStatus.ACTIVE;

    return this.enrollmentRepository.create(enrollment);
  }
}
