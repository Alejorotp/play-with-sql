import {
  Body,
  Controller,
  Post,
  UseGuards,
  HttpCode,
  HttpStatus,
  Request,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from '../../infrastructure/auth/decorators/roles.decorator';
import { Role } from '../../infrastructure/auth/enums/role.enum';
import { JwtAuthGuard } from '../../infrastructure/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../infrastructure/auth/guards/roles.guard';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { SubmissionResponseDto } from './dto/submission-response.dto';
import { SubmissionService } from './submission.service';

@ApiTags('submissions')
@ApiBearerAuth()
@Controller('submissions')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.STUDENT, Role.PROFESSOR)
export class SubmissionController {
  constructor(private readonly submissionService: SubmissionService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create submission with SQL query (STUDENT, PROFESSOR)' })
  @ApiResponse({ status: 201, type: SubmissionResponseDto })
  @ApiResponse({ status: 400, description: 'Challenge not published or invalid query' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Challenge not found' })
  async create(
    @Body() createSubmissionDto: CreateSubmissionDto,
    @Request() req: any,
  ): Promise<SubmissionResponseDto> {
    const studentId = req.user.id;
    return this.submissionService.create(createSubmissionDto, studentId);
  }
}
