import type { ICourseRepository } from '../../domain/repositories/course.repository.interface';
import { Injectable } from '@nestjs/common';
import { Course } from '../../domain/entities/course.entity';

@Injectable()
export class GetCoursesUseCase {
  constructor(private readonly courseRepository: ICourseRepository) {}

  async execute(): Promise<Course[]> {
    return this.courseRepository.findAll();
  }
}
