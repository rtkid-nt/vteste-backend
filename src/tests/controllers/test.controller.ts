import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
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

  @ApiOkResponse({ type: TestResponse, isArray: true })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get()
  async findAll(): Promise<TestResponse[]> {
    return await this.testService.findAll();
  }

  @ApiOkResponse({ type: TestResponse })
  @Get(':id')
  async findById(@Param('id') id: string): Promise<TestResponse> {
    return await this.testService.findById(id);
  }
}