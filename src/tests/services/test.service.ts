import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/users/services/user.service';
import { Repository } from 'typeorm';
import { TestDTO } from '../dto/test.dto';
import { TestEntity } from '../entities/test.entity';

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(TestEntity)
    private readonly testsRepository: Repository<TestEntity>,
    private readonly userService: UserService,
  ) {}

  async create(userId: string, testDTO: TestDTO): Promise<TestEntity> {
    const test = await this.testsRepository.save(testDTO);
    await this.userService.addTest(userId, test);

    return test;
  }

  async findAll(): Promise<TestEntity[]> {
    return await this.testsRepository.find();
  }

  async findById(id: string): Promise<TestEntity> {
    return await this.testsRepository.findOne({
      where: { id },
    });
  }
}
