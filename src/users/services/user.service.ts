import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UserEntity } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { TestEntity } from 'src/tests/entities/test.entity';
import { TestResultEntity } from 'src/test-results/entities/test-result.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async create(dto: CreateUserDTO): Promise<UserEntity> {
    dto.password = await this.hashPassword(dto.password);
    return await this.usersRepository.save(dto);
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.usersRepository.find({
      relations: ['tests', 'testResults'],
    });
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({
      where: { email },
      relations: ['tests', 'testResults'],
    });
    if (user?.tests)
      user.tests = user.tests.filter((t) => t.isStarted !== true);

    return user;
  }

  async findById(id: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['tests', 'testResults'],
    });
    user.tests = user.tests.filter((t) => t.isStarted !== true);

    return user;
  }

  async addTest(id: string, test: TestEntity): Promise<void> {
    let user = await this.findById(id);
    user.tests.push(test);
    await this.usersRepository.save(user, { reload: true });
  }

  async addTestResult(id: string, testResult: TestResultEntity): Promise<void> {
    let user = await this.findById(id);
    user.testResults.push(testResult);
    await this.usersRepository.save(user, { reload: true });
  }
}
