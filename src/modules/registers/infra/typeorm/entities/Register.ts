import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';

@Entity('registers')
class Register {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  manager: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'manager' })
  name: User;

  @Column()
  student: string;

  @Column('integer')
  phone: number;

  @Column()
  responsible: string;

  @Column('timestamp with time zone')
  startDate: Date;

  @Column()
  schedule: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Register;
