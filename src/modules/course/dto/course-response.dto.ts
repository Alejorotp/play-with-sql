import { ApiProperty } from '@nestjs/swagger';

export class CourseResponseDto {
  @ApiProperty({ description: 'Course UUID' })
  id: string;

  @ApiProperty({ description: 'Professor UUID' })
  professorId: string;

  @ApiProperty({ description: 'Course name' })
  name: string;

  @ApiProperty({ description: 'Unique course code' })
  code: string;

  @ApiProperty({ description: 'Academic period' })
  period: string;

  @ApiProperty({ description: 'Class group' })
  group: string;

  @ApiProperty({ description: 'Active status' })
  isActive: boolean;

  @ApiProperty({ description: 'Creation timestamp' })
  createdAt: Date;
}
