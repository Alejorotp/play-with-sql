import { ApiProperty } from '@nestjs/swagger';

export class TestCaseResultDto {
  @ApiProperty({ example: 1 })
  caseId!: number;

  @ApiProperty({ enum: ['OK', 'FAILED'], example: 'OK' })
  status!: string;

  @ApiProperty({ example: 5 })
  rowsExpected!: number;

  @ApiProperty({ example: 5 })
  rowsReturned!: number;
}

export class SubmissionResultDto {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d' })
  submissionId!: string;

  @ApiProperty({ enum: ['ACCEPTED', 'WRONG_ANSWER', 'SYNTAX_ERROR', 'TIME_LIMIT_EXCEEDED', 'RUNTIME_ERROR', 'OPTIMIZATION_REQUIRED'], example: 'ACCEPTED' })
  status!: string;

  @ApiProperty({ example: 100 })
  score!: number;

  @ApiProperty({ example: 120 })
  executionTimeMs!: number;

  @ApiProperty({ type: [TestCaseResultDto] })
  tests!: TestCaseResultDto[];
}
