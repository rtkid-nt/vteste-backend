import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/utils/base.entity';
import { TestEntity } from 'src/tests/entities/test.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => TestEntity, (test) => test.user, { cascade: true })
  tests: TestEntity[];
}
