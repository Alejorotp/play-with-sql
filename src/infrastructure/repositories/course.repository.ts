import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from '../../domain/entities/course.entity';
import { ICourseRepository } from '../../domain/repositories/course.repository.interface';

@Injectable()
export class CourseRepository implements ICourseRepository {
  constructor(@InjectRepository(Course) private readonly repository: Repository<Course>) {}

  async create(course: Course): Promise<Course> {
    return this.repository.save(course);
  }

  async findById(id: string): Promise<Course | null> {
    return this.repository.findOne({ where: { id } });
  }

  async findByCode(code: string): Promise<Course | null> {
    return this.repository.findOne({ where: { code } });
  }

  async findAll(): Promise<Course[]> {
    return this.repository.find({ where: { isActive: true } });
  }

  async findByProfessor(professorId: string): Promise<Course[]> {
    return this.repository.find({ where: { professorId, isActive: true } });
  }

  async update(id: string, course: Partial<Course>): Promise<Course> {
    await this.repository.update(id, course);
    return this.repository.findOneOrFail({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.repository.update(id, { isActive: false });
  }
}
