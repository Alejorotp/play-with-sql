import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from '../../domain/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { PaginatedUsersResponseDto } from './dto/paginated-users-response.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { UsersQueryDto } from './dto/users-query.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    await this.ensureEmailIsUnique(createUserDto.email);

    const passwordHash = await bcrypt.hash(createUserDto.password, 10);
    const user = this.userRepository.create({
      name: createUserDto.name,
      email: createUserDto.email,
      passwordHash,
      role: createUserDto.role,
      isActive: true,
    });

    const savedUser = await this.userRepository.save(user);
    return this.toResponseDto(savedUser);
  }

  async findAll(query: UsersQueryDto): Promise<PaginatedUsersResponseDto> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const skip = (page - 1) * limit;

    const [items, total] = await this.userRepository.findAndCount({
      where: { isActive: true },
      order: { createdAt: 'DESC' },
      skip,
      take: limit,
    });

    return {
      items: items.map((user) => this.toResponseDto(user)),
      total,
      page,
      limit,
    };
  }

  async findOne(id: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({ where: { id, isActive: true } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.toResponseDto(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({ where: { id, isActive: true } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (updateUserDto.email && updateUserDto.email !== user.email) {
      await this.ensureEmailIsUnique(updateUserDto.email, user.id);
    }

    Object.assign(user, updateUserDto);
    const updatedUser = await this.userRepository.save(user);
    return this.toResponseDto(updatedUser);
  }

  async remove(id: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id, isActive: true } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.isActive = false;
    await this.userRepository.save(user);
  }

  private async ensureEmailIsUnique(email: string, currentUserId?: string): Promise<void> {
    const existingUser = await this.userRepository.findOne({ where: { email } });

    if (existingUser && existingUser.id !== currentUserId) {
      throw new ConflictException('Email already exists');
    }
  }

  private toResponseDto(user: User): UserResponseDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}