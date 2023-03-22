import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/users/services/user.service';
import { Repository } from 'typeorm';
import { AnswerDTO, TestDTO } from '../dto/test.dto';
import { TestEntity } from '../entities/test.entity';
import { AppError } from 'src/utils/errors';
import { TestResultService } from 'src/test-results/services/test-result.service';
import { TestResultDTO } from 'src/test-results/dto/test-result.dto';
import { PutAnswerDTO } from '../dto/put-answer.dto';

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(TestEntity)
    private readonly testsRepository: Repository<TestEntity>,
    private readonly userService: UserService,
    private readonly testResultService: TestResultService,
  ) {}

  async create(userId: string, testDTO: TestDTO): Promise<TestEntity> {
    const test = await this.testsRepository.save(testDTO);
    await this.userService.addTest(userId, test);

    return test;
  }

  async remove(id: string): Promise<void> {
    await this.testsRepository.delete(id);
  }

  async update(testDTO: TestDTO): Promise<void> {
    await this.testsRepository.update(testDTO.id, testDTO);
  }

  async findAll(): Promise<TestEntity[]> {
    return await this.testsRepository.find({ where: { isStarted: false } });
  }

  async findByCode(code: string): Promise<TestEntity> {
    const test = await this.testsRepository.findOne({
      where: { code },
    });

    if (!test.isStarted)
      throw new BadRequestException(AppError.TEST_IS_NOT_STARTED);

    return test;
  }

  async start(id: string, userId: string): Promise<void> {
    const test = await this.testsRepository.findOne({
      where: { id },
    });
    test.isStarted = true;
    await this.testsRepository.save(test);

    const testResultDTO: TestResultDTO = {
      testCode: test.code,
      testName: test.name,
      countQuestions: test.questions.length,
      students: [],
    };
    const testResult = await this.testResultService.create(
      userId,
      testResultDTO,
    );

    setTimeout(() => {
      this.testResultService.markEnded(testResult.id);
    }, Number(test.time) * 60 * 1000);
  }

  async registerStudent(code: string, name: string): Promise<void> {
    this.testResultService.registerStudent(code, name);
  }

  async putAnswer(code: string, answerDTO: PutAnswerDTO): Promise<void> {
    const test = await this.findByCode(code);
    const isValid =
      test.questions[answerDTO.questionIndex].answers[answerDTO.answerIndex]
        .isValid;
    this.testResultService.putAnswer(code, answerDTO, isValid);
  }
}
