import { IsUUID, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EnrollStudentDto {
  @ApiProperty({ description: 'Student UUID to enroll' })
  @IsUUID()
  @IsNotEmpty()
  studentId: string;
}
