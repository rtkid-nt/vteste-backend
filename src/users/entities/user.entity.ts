import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/utils/base.entity';
import { TestEntity } from 'src/tests/entities/test.entity';
import { TestResultEntity } from 'src/test-results/entities/test-result.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column({ name: 'email', unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => TestEntity, (test) => test.user, { cascade: true })
  tests: TestEntity[];

  @OneToMany(() => TestResultEntity, (testResult) => testResult.user, {
    cascade: true,
  })
  testResults: TestResultEntity[];
}
