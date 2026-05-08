import { Injectable } from '@nestjs/common';
import { CreateCourseUseCase } from '../../application/course/create-course.use-case';
import { GetCourseUseCase } from '../../application/course/get-course.use-case';
import { GetCoursesUseCase } from '../../application/course/get-courses.use-case';
import { UpdateCourseUseCase } from '../../application/course/update-course.use-case';
import { DeleteCourseUseCase } from '../../application/course/delete-course.use-case';
import { EnrollStudentUseCase } from '../../application/course/enroll-student.use-case';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseResponseDto } from './dto/course-response.dto';
import { EnrollStudentDto } from './dto/enroll-student.dto';

@Injectable()
export class CourseService {
  constructor(
    private readonly createCourseUseCase: CreateCourseUseCase,
    private readonly getCourseUseCase: GetCourseUseCase,
    private readonly getCoursesUseCase: GetCoursesUseCase,
    private readonly updateCourseUseCase: UpdateCourseUseCase,
    private readonly deleteCourseUseCase: DeleteCourseUseCase,
    private readonly enrollStudentUseCase: EnrollStudentUseCase,
  ) {}

  async create(professorId: string, dto: CreateCourseDto): Promise<CourseResponseDto> {
    const course = await this.createCourseUseCase.execute(professorId, dto);
    return this.mapToCourseResponseDto(course);
  }

  async findById(courseId: string): Promise<CourseResponseDto> {
    const course = await this.getCourseUseCase.execute(courseId);
    return this.mapToCourseResponseDto(course);
  }

  async findAll(): Promise<CourseResponseDto[]> {
    const courses = await this.getCoursesUseCase.execute();
    return courses.map((course) => this.mapToCourseResponseDto(course));
  }

  async update(courseId: string, dto: UpdateCourseDto): Promise<CourseResponseDto> {
    const course = await this.updateCourseUseCase.execute(courseId, dto);
    return this.mapToCourseResponseDto(course);
  }

  async delete(courseId: string): Promise<void> {
    await this.deleteCourseUseCase.execute(courseId);
  }

  async enrollStudent(courseId: string, dto: EnrollStudentDto): Promise<{ message: string }> {
    await this.enrollStudentUseCase.execute(courseId, dto.studentId);
    return { message: 'Student successfully enrolled in the course' };
  }

  private mapToCourseResponseDto(course: any): CourseResponseDto {
    return {
      id: course.id,
      professorId: course.professorId,
      name: course.name,
      code: course.code,
      period: course.period,
      group: course.group,
      isActive: course.isActive,
      createdAt: course.createdAt,
    };
  }
}
