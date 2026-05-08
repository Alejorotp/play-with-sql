import type { ICourseRepository } from '../../domain/repositories/course.repository.interface';
import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Course } from '../../domain/entities/course.entity';

@Injectable()
export class GetCourseUseCase {
  constructor(@Inject('ICourseRepository') private readonly courseRepository: ICourseRepository) {}

  async execute(courseId: string): Promise<Course> {
    const course = await this.courseRepository.findById(courseId);
    if (!course) {
      throw new NotFoundException(`Course with ID ${courseId} not found`);
    }
    return course;
  }
}
