import type { ICourseRepository } from '../../domain/repositories/course.repository.interface';
import { Injectable, BadRequestException } from '@nestjs/common';
import { Course } from '../../domain/entities/course.entity';
import type { CreateCourseDto } from '../../modules/course/dto/create-course.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CreateCourseUseCase {
  constructor(private readonly courseRepository: ICourseRepository) {}

  async execute(professorId: string, dto: CreateCourseDto): Promise<Course> {
    const existingCourse = await this.courseRepository.findByCode(dto.code);
    if (existingCourse) {
      throw new BadRequestException(`Course with code ${dto.code} already exists`);
    }

    const course = new Course();
    course.id = uuidv4();
    course.name = dto.name;
    course.code = dto.code;
    course.period = dto.period;
    course.group = dto.group;
    course.professorId = professorId;
    course.isActive = true;
    course.createdAt = new Date();

    return this.courseRepository.create(course);
  }
}
