import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PutAnswerDTO } from 'src/tests/dto/put-answer.dto';
import { UserService } from 'src/users/services/user.service';
import { Repository } from 'typeorm';
import { TestResultDTO } from '../dto/test-result.dto';
import { TestResultEntity } from '../entities/test-result.entity';

@Injectable()
export class TestResultService {
  constructor(
    @InjectRepository(TestResultEntity)
    private readonly testResultsRepository: Repository<TestResultEntity>,
    private readonly userService: UserService,
  ) {}

  async create(
    userId: string,
    testResultDTO: TestResultDTO,
  ): Promise<TestResultEntity> {
    const testResult = await this.testResultsRepository.save(testResultDTO);
    await this.userService.addTestResult(userId, testResult);
    return testResult;
  }

  async registerStudent(testCode: string, name: string): Promise<void> {
    const testResult = await this.testResultsRepository.findOne({
      where: { testCode: testCode },
    });

    testResult.students.push({ name: name, answers: [] });

    await this.testResultsRepository.save(testResult);
  }

  async putAnswer(
    testCode: string,
    answerDTO: PutAnswerDTO,
    isValid: boolean,
  ): Promise<void> {
    const testResult = await this.testResultsRepository.findOne({
      where: { testCode: testCode },
    });

    testResult.students
      .find((s) => s.name === answerDTO.name)
      .answers.push(isValid);

    await this.testResultsRepository.save(testResult);
  }

  async markEnded(id: string): Promise<void> {
    const testResult = await this.testResultsRepository.findOne({
      where: { id },
    });

    testResult.isEnded = true;
    await this.testResultsRepository.save(testResult);
  }
}
