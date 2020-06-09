import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
  } from 'typeorm';

@Entity('registers')
class Register {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string;

  @Column('integer')
  phone: number;

  @Column()
  responsable: string;

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
