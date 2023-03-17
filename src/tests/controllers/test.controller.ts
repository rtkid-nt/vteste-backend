import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { PutAnswerDTO } from '../dto/put-answer.dto';
import { StudentDTO } from '../dto/student.dto';
import { TestDTO } from '../dto/test.dto';
import { TestResponse } from '../responses/test.response';
import { TestService } from '../services/test.service';

@ApiTags('tests')
@Controller('tests')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @ApiOkResponse({ type: TestResponse })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post()
  async create(@Body() testDTO: TestDTO, @Req() req): Promise<TestResponse> {
    return await this.testService.create(req.user.id, testDTO);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.testService.remove(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Patch()
  async update(@Body() testDTO: TestDTO): Promise<void> {
    await this.testService.update(testDTO);
  }

  @ApiOkResponse({ type: TestResponse, isArray: true })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get()
  async findAll(): Promise<TestResponse[]> {
    return await this.testService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post('/start/:id')
  async start(@Param('id') id: string, @Req() req): Promise<void> {
    await this.testService.start(id, req.user.id);
  }

  @ApiOkResponse({ type: TestResponse })
  @Get(':id')
  async findById(@Param('id') id: string): Promise<TestResponse> {
    return await this.testService.findById(id);
  }

  @Post(':id/register')
  async registerStudent(
    @Param('id') id: string,
    @Body() studentDTO: StudentDTO,
  ): Promise<void> {
    await this.testService.registerStudent(id, studentDTO.name);
  }

  @Post(':id/answer')
  async putAnswer(
    @Param('id') id: string,
    @Body() answerDTO: PutAnswerDTO,
  ): Promise<void> {
    await this.testService.putAnswer(id, answerDTO);
  }
}
