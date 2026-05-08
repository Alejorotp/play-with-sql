import { Controller, Post, Get, Patch, Delete, Param, Body, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBadRequestResponse, ApiNotFoundResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../../infrastructure/auth/decorators/roles.decorator';
import { Role } from '../../infrastructure/auth/enums/role.enum';
import { JwtAuthGuard } from '../../infrastructure/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../infrastructure/auth/guards/roles.guard';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseResponseDto } from './dto/course-response.dto';
import { EnrollStudentDto } from './dto/enroll-student.dto';

@ApiTags('courses')
@ApiBearerAuth()
@Controller('courses')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CourseController {
  constructor(private readonly courseService: CourseService) { }

  @Post()
  @Roles(Role.ADMIN, Role.PROFESSOR)
  @ApiOperation({ summary: 'Create a new course' })
  @ApiResponse({ status: 201, description: 'Course created successfully', type: CourseResponseDto })
  @ApiBadRequestResponse({ description: 'Invalid input or course code already exists' })
  async create(@Body() dto: CreateCourseDto): Promise<CourseResponseDto> {
    return this.courseService.create(dto);
  }

  @Get()
  @Roles(Role.ADMIN, Role.PROFESSOR, Role.STUDENT)
  @ApiOperation({ summary: 'Get all active courses' })
  @ApiResponse({ status: 200, description: 'List of courses', type: [CourseResponseDto] })
  async findAll(): Promise<CourseResponseDto[]> {
    return this.courseService.findAll();
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.PROFESSOR, Role.STUDENT)
  @ApiOperation({ summary: 'Get a course by ID' })
  @ApiResponse({ status: 200, description: 'Course found', type: CourseResponseDto })
  @ApiNotFoundResponse({ description: 'Course not found' })
  async findById(@Param('id') courseId: string): Promise<CourseResponseDto> {
    return this.courseService.findById(courseId);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.PROFESSOR)
  @ApiOperation({ summary: 'Update a course' })
  @ApiResponse({ status: 200, description: 'Course updated successfully', type: CourseResponseDto })
  @ApiNotFoundResponse({ description: 'Course not found' })
  async update(@Param('id') courseId: string, @Body() dto: UpdateCourseDto): Promise<CourseResponseDto> {
    return this.courseService.update(courseId, dto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.PROFESSOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a course' })
  @ApiResponse({ status: 204, description: 'Course deleted successfully' })
  @ApiNotFoundResponse({ description: 'Course not found' })
  async delete(@Param('id') courseId: string): Promise<void> {
    await this.courseService.delete(courseId);
  }

  @Post(':id/enroll')
  @Roles(Role.ADMIN, Role.PROFESSOR, Role.STUDENT)
  @ApiOperation({ summary: 'Enroll a student in a course' })
  @ApiResponse({ status: 200, description: 'Student enrolled successfully' })
  @ApiBadRequestResponse({ description: 'Student already enrolled or invalid input' })
  @ApiNotFoundResponse({ description: 'Course not found' })
  async enrollStudent(@Param('id') courseId: string, @Body() dto: EnrollStudentDto): Promise<{ message: string }> {
    return this.courseService.enrollStudent(courseId, dto);
  }
}
