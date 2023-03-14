import {
  BadRequestException,
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { UserResponse } from '../responses/user.response';
import { UserService } from '../services/user.service';
import { AppError } from 'src/utils/errors';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOkResponse({ type: UserResponse, isArray: true })
  @UseGuards(JwtGuard)
  @Get()
  async findAll(): Promise<UserResponse[]> {
    return await this.userService.findAll();
  }
}
