import { ApiProperty } from '@nestjs/swagger';

export class StudentDTO {
  @ApiProperty({ example: 'Никита' })
  name: string;
}
