import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsObject } from 'class-validator';

export class AddChallengeSchemaDto {
  @ApiProperty({ description: 'DDL script to create tables', example: 'CREATE TABLE users (id INT);' })
  @IsString()
  @IsNotEmpty()
  ddlScript: string;

  @ApiProperty({ description: 'DML script to seed data', example: 'INSERT INTO users VALUES (1);' })
  @IsString()
  @IsNotEmpty()
  seedDataScript: string;

  @ApiProperty({ description: 'Data generator configuration JSON', example: { users: 10 } })
  @IsObject()
  @IsNotEmpty()
  generatorConfig: any;
}
