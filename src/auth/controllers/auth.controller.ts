import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { LoginUserDTO } from '../dto/login-user.dto';
import { JwtGuard } from '../guards/jwt.guard';
import { AuthResponse } from '../responses/auth.response';
import { AuthService } from '../services/auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({ type: AuthResponse })
  @Post('register')
  async register(@Body() dto: CreateUserDTO): Promise<AuthResponse> {
    return await this.authService.register(dto);
  }

  @ApiOkResponse({ type: AuthResponse })
  @Post('login')
  async login(@Body() dto: LoginUserDTO): Promise<AuthResponse> {
    return await this.authService.login(dto);
  }

  @ApiOkResponse({ type: AuthResponse })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post()
  async auth(@Req() req): Promise<AuthResponse> {
    return await this.authService.auth(req.user.id);
  }
}
