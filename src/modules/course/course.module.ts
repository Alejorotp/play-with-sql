import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from '../../domain/entities/course.entity';
import { CourseEnrollment } from '../../domain/entities/course-enrollment.entity';
import { CourseRepository } from '../../infrastructure/repositories/course.repository';
import { CourseEnrollmentRepository } from '../../infrastructure/repositories/course-enrollment.repository';
import { CreateCourseUseCase } from '../../application/course/create-course.use-case';
import { GetCourseUseCase } from '../../application/course/get-course.use-case';
import { GetCoursesUseCase } from '../../application/course/get-courses.use-case';
import { UpdateCourseUseCase } from '../../application/course/update-course.use-case';
import { DeleteCourseUseCase } from '../../application/course/delete-course.use-case';
import { EnrollStudentUseCase } from '../../application/course/enroll-student.use-case';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Course, CourseEnrollment])],
  providers: [
    { provide: 'ICourseRepository', useClass: CourseRepository },
    { provide: 'ICourseEnrollmentRepository', useClass: CourseEnrollmentRepository },
    CreateCourseUseCase,
    GetCourseUseCase,
    GetCoursesUseCase,
    UpdateCourseUseCase,
    DeleteCourseUseCase,
    EnrollStudentUseCase,
    CourseService,
  ],
  controllers: [CourseController],
  exports: ['ICourseRepository', 'ICourseEnrollmentRepository'],
})
export class CourseModule {}
