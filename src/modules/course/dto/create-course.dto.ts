import { IsString, IsNotEmpty, Length, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCourseDto {

  @ApiProperty({ description: 'Professor ID', example: '242e5d1d-1dc6-42fb-a02e-69526636c67d' })
  @IsString()
  @IsNotEmpty()
  professorId: string;

  @ApiProperty({ description: 'Course name', example: 'Introduction to SQL' })
  @IsString()
  @IsNotEmpty()
  @Length(1, 150)
  name: string;

  @ApiProperty({ description: 'Unique course code', example: 'SQL101' })
  @IsString()
  @IsNotEmpty()
  @Length(1, 30)
  @Matches(/^[A-Z0-9]+$/, { message: 'Code must contain only uppercase letters and numbers' })
  code: string;

  @ApiProperty({ description: 'Academic period', example: '2024-1' })
  @IsString()
  @IsNotEmpty()
  @Length(1, 20)
  period: string;

  @ApiProperty({ description: 'Class group identifier', example: 'A' })
  @IsString()
  @IsNotEmpty()
  @Length(1, 10)
  group: string;
}
