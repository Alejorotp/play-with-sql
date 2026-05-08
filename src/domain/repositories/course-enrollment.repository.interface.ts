import { CourseEnrollment } from '../entities/course-enrollment.entity';

export interface ICourseEnrollmentRepository {
  create(enrollment: CourseEnrollment): Promise<CourseEnrollment>;
  findByCourseAndStudent(courseId: string, studentId: string): Promise<CourseEnrollment | null>;
  findByCourse(courseId: string): Promise<CourseEnrollment[]>;
  findByStudent(studentId: string): Promise<CourseEnrollment[]>;
  delete(courseId: string, studentId: string): Promise<void>;
}
