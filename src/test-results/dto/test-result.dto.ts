import { ApiProperty } from '@nestjs/swagger';
class Student {
  @ApiProperty()
  name: string;

  @ApiProperty()
  answers: boolean[];
}

export class TestResultDTO {
  @ApiProperty()
  testCode: string;

  @ApiProperty()
  testName: string;

  @ApiProperty()
  countQuestions: number;

  @ApiProperty({
    isArray: true,
    example: [
      {
        name: 'Никита',
        answers: [false, false, true, true],
      },
      {
        name: 'Коля',
        answers: [true, false, false, false],
      },
    ],
  })
  students: Student[];
}
