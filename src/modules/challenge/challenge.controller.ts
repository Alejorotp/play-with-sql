import { Controller, Post, Get, Patch, Delete, Param, Body, Query, HttpCode, HttpStatus, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ChallengeService } from './challenge.service';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { ChallengeResponseDto } from './dto/challenge-response.dto';
import { AddChallengeSchemaDto } from './dto/add-challenge-schema.dto';
import { ChallengeSchemaResponseDto } from './dto/challenge-schema-response.dto';
import { JwtAuthGuard } from '../../infrastructure/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../infrastructure/auth/guards/roles.guard';
import { Roles } from '../../infrastructure/auth/decorators/roles.decorator';
import { Role } from '../../infrastructure/auth/enums/role.enum';

@ApiTags('challenges')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('challenges')
export class ChallengeController {
  constructor(private readonly challengeService: ChallengeService) {}

  @Post()
  @Roles(Role.ADMIN, Role.PROFESSOR)
  @ApiOperation({ summary: 'Create a new challenge' })
  @ApiResponse({ status: 201, type: ChallengeResponseDto })
  async create(@Request() req: any, @Body() dto: CreateChallengeDto): Promise<ChallengeResponseDto> {
    const creatorId = req.user.id;
    return this.challengeService.create(creatorId, dto);
  }

  @Get()
  @Roles(Role.ADMIN, Role.PROFESSOR, Role.STUDENT)
  @ApiOperation({ summary: 'Get all challenges, optionally filtered by courseId' })
  @ApiResponse({ status: 200, type: [ChallengeResponseDto] })
  async findAll(@Query('courseId') courseId?: string): Promise<ChallengeResponseDto[]> {
    return this.challengeService.findAll(courseId);
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.PROFESSOR, Role.STUDENT)
  @ApiOperation({ summary: 'Get a challenge by ID' })
  @ApiResponse({ status: 200, type: ChallengeResponseDto })
  async findById(@Param('id') id: string): Promise<ChallengeResponseDto> {
    return this.challengeService.findById(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.PROFESSOR)
  @ApiOperation({ summary: 'Update a challenge' })
  @ApiResponse({ status: 200, type: ChallengeResponseDto })
  async update(@Param('id') id: string, @Body() dto: UpdateChallengeDto): Promise<ChallengeResponseDto> {
    return this.challengeService.update(id, dto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.PROFESSOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a challenge' })
  @ApiResponse({ status: 204 })
  async delete(@Param('id') id: string): Promise<void> {
    await this.challengeService.delete(id);
  }

  @Post(':id/schema')
  @Roles(Role.ADMIN, Role.PROFESSOR)
  @ApiOperation({ summary: 'Add or update challenge schema' })
  @ApiResponse({ status: 201, type: ChallengeSchemaResponseDto })
  async addSchema(@Param('id') challengeId: string, @Body() dto: AddChallengeSchemaDto): Promise<ChallengeSchemaResponseDto> {
    return this.challengeService.addSchema(challengeId, dto);
  }
}
