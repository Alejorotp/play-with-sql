import { Course } from '../entities/course.entity';

export interface ICourseRepository {
  create(course: Course): Promise<Course>;
  findById(id: string): Promise<Course | null>;
  findByCode(code: string): Promise<Course | null>;
  findAll(): Promise<Course[]>;
  findByProfessor(professorId: string): Promise<Course[]>;
  update(id: string, course: Partial<Course>): Promise<Course>;
  delete(id: string): Promise<void>;
}
