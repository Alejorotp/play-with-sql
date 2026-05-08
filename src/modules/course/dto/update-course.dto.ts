import { IsString, IsOptional, Length, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCourseDto {
  @ApiProperty({ description: 'Course name', example: 'Introduction to SQL', required: false })
  @IsString()
  @IsOptional()
  @Length(1, 150)
  name?: string;

  @ApiProperty({ description: 'Academic period', example: '2024-1', required: false })
  @IsString()
  @IsOptional()
  @Length(1, 20)
  period?: string;

  @ApiProperty({ description: 'Class group identifier', example: 'A', required: false })
  @IsString()
  @IsOptional()
  @Length(1, 10)
  group?: string;
}
