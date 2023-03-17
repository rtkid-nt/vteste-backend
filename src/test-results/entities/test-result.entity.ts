import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/utils/base.entity';
import { UserEntity } from 'src/users/entities/user.entity';

@Entity('test-results')
export class TestResultEntity extends BaseEntity {
  @Column()
  testId: string;

  @Column()
  testName: string;

  @Column()
  countQuestions: number;

  @Column('simple-json')
  students: Array<{
    name: string;
    answers: Array<boolean>;
  }>;

  @Column({ default: false })
  isEnded: boolean;

  @ManyToOne(() => UserEntity, (user) => user.testResults)
  user: UserEntity;
}
