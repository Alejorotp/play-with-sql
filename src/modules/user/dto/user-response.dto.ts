import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../../domain/enums/role.enum';

export class UserResponseDto {
  @ApiProperty({ example: '7f7e3d75-0e9d-45db-8f7b-4ea4e213fd0d' })
  id!: string;

  @ApiProperty({ example: 'Ada Lovelace' })
  name!: string;

  @ApiProperty({ example: 'ada@example.com' })
  email!: string;

  @ApiProperty({ enum: Role, example: Role.PROFESSOR })
  role!: Role;

  @ApiProperty({ example: true })
  isActive!: boolean;

  @ApiProperty({ example: '2026-05-08T10:00:00.000Z' })
  createdAt!: Date;

  @ApiProperty({ example: '2026-05-08T11:00:00.000Z' })
  updatedAt!: Date;
}