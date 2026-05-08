import { ApiProperty } from '@nestjs/swagger';

export class ChallengeSchemaResponseDto {
  @ApiProperty({ description: 'Schema ID' })
  id: string;

  @ApiProperty({ description: 'Challenge ID' })
  challengeId: string;

  @ApiProperty({ description: 'DDL script' })
  ddlScript: string;

  @ApiProperty({ description: 'Seed data script' })
  seedDataScript: string;

  @ApiProperty({ description: 'Data generator config' })
  generatorConfig: any;

  @ApiProperty({ description: 'Schema version' })
  version: number;
}
