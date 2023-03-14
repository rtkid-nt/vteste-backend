import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { UserService } from 'src/users/services/user.service';
import { AppError } from 'src/utils/errors';
import { LoginUserDTO } from '../dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthResponse } from '../responses/auth.response';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateJwtToken(id: string): Promise<string> {
    return this.jwtService.sign(
      { id: id },
      {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: this.configService.get<string>('JWT_EXPIRE'),
      },
    );
  }

  async register(dto: CreateUserDTO): Promise<AuthResponse> {
    if (await this.userService.findByEmail(dto.email))
      throw new BadRequestException(AppError.USER_EXIST);

    const user = await this.userService.create(dto);
    const token = await this.generateJwtToken(user.id);

    return { user, token };
  }

  async login(dto: LoginUserDTO): Promise<AuthResponse> {
    const user = await this.userService.findByEmail(dto.email);
    if (!user) throw new BadRequestException(AppError.USER_NOT_EXIST);

    const isValidPassword = await bcrypt.compare(dto.password, user.password);
    if (!isValidPassword)
      throw new BadRequestException(AppError.INVALID_PASSWORD);

    const token = await this.generateJwtToken(user.id);
    return { user, token };
  }

  async auth(id: string): Promise<AuthResponse> {
    const user = await this.userService.findById(id);
    if (!user) throw new BadRequestException(AppError.USER_NOT_EXIST);

    const token = await this.generateJwtToken(user.id);
    return { user, token };
  }
}
