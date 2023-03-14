import { ApiProperty } from '@nestjs/swagger';
import { UserResponse } from 'src/users/responses/user.response';

export class AuthResponse {
  @ApiProperty()
  user: UserResponse;

  @ApiProperty()
  token: string;
}
