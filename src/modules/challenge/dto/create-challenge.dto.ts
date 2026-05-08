import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum, IsArray, IsInt, IsUUID } from 'class-validator';
import { Difficulty } from '../../../domain/enums/difficulty.enum';

export class CreateChallengeDto {
  @ApiProperty({ description: 'Course ID', example: '242e5d1d-1dc6-42fb-a02e-69526636c67d' })
  @IsUUID()
  @IsNotEmpty()
  courseId: string;

  @ApiProperty({ description: 'Title of the challenge', example: 'Find all users' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Description of the challenge', example: 'Write a SQL query to find all users in the users table.' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'Difficulty level', enum: Difficulty, example: Difficulty.EASY })
  @IsEnum(Difficulty)
  @IsNotEmpty()
  difficulty: Difficulty;

  @ApiProperty({ description: 'Tags for the challenge', example: ['SELECT', 'BASIC'] })
  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @ApiProperty({ description: 'Database engine', example: 'PostgreSQL' })
  @IsString()
  @IsNotEmpty()
  databaseEngine: string;

  @ApiProperty({ description: 'Time limit in minutes', example: 10 })
  @IsInt()
  @IsNotEmpty()
  timeLimit: number;
}
