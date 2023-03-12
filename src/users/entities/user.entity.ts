// item.entity.ts
import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'src/base/base.enity';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 30 })
  email: string;

  @Column({ type: 'varchar', length: 30 })
  password: string;
}
