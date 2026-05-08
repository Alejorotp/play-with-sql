import type { ICourseRepository } from '../../domain/repositories/course.repository.interface';
import { Injectable, Inject } from '@nestjs/common';
import { Course } from '../../domain/entities/course.entity';

@Injectable()
export class GetCoursesUseCase {
  constructor(@Inject('ICourseRepository') private readonly courseRepository: ICourseRepository) {}

  async execute(): Promise<Course[]> {
    return this.courseRepository.findAll();
  }
}
