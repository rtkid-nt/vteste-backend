import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/utils/base.entity';
import { UserEntity } from 'src/users/entities/user.entity';

@Entity('tests')
export class TestEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  time: string;

  @Column('simple-json')
  questions: Array<{
    name: string;
    description: string;
    answers: Array<{
      text: string;
      isValid: boolean;
    }>;
  }>;

  @Column()
  correctAnswersCountMark_5: number;

  @Column()
  correctAnswersCountMark_4: number;

  @Column()
  correctAnswersCountMark_3: number;

  @Column({ default: false })
  isStarted: boolean;

  @Column()
  code: string;

  @ManyToOne(() => UserEntity, (user) => user.tests)
  user: UserEntity;
}
