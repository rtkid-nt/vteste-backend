import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'src/utils/base.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}
