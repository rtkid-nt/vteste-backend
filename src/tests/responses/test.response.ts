import { ApiProperty } from '@nestjs/swagger';

export class AnswerResponse {
  @ApiProperty()
  text: string;

  @ApiProperty()
  isValid: boolean;
}

export class QuestionResponse {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ isArray: true })
  answers: AnswerResponse[];
}

export class TestResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  time: string;

  @ApiProperty({
    isArray: true,
    example: [
      {
        name: 'Логарифм',
        decription: 'Что такое логарифм?',
        answers: [
          {
            text: 'Это показатель степени',
            isValid: true,
          },
          {
            text: 'Это степень показателя',
            isValid: false,
          },
        ],
      },
    ],
  })
  questions: QuestionResponse[];

  @ApiProperty()
  correctAnswersCountMark_5: number;

  @ApiProperty()
  correctAnswersCountMark_4: number;

  @ApiProperty()
  correctAnswersCountMark_3: number;
}
