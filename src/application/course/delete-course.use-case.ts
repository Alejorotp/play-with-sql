import type { ICourseRepository } from '../../domain/repositories/course.repository.interface';
import { Injectable, NotFoundException, Inject } from '@nestjs/common';

@Injectable()
export class DeleteCourseUseCase {
  constructor(@Inject('ICourseRepository') private readonly courseRepository: ICourseRepository) {}

  async execute(courseId: string): Promise<void> {
    const course = await this.courseRepository.findById(courseId);
    if (!course) {
      throw new NotFoundException(`Course with ID ${courseId} not found`);
    }

    await this.courseRepository.delete(courseId);
  }
}
