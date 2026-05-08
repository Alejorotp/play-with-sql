import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, MinLength, IsOptional } from 'class-validator';

export class CreateSubmissionDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsUUID()
  @IsNotEmpty()
  challengeId!: string;

  @ApiProperty({ example: 'SELECT * FROM users WHERE id = 1' })
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  query!: string;

  @ApiPropertyOptional({ example: 'postgresql', default: 'postgresql' })
  @IsOptional()
  @IsString()
  engine?: string;
}
