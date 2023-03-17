import { ApiProperty } from '@nestjs/swagger';

export class PutAnswerDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  questionIndex: number;

  @ApiProperty()
  answerIndex: number;
}
