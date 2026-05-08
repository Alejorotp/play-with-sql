import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { Role } from '../../../domain/enums/role.enum';

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'Grace Hopper' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'grace@example.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ enum: Role, example: Role.STUDENT })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}