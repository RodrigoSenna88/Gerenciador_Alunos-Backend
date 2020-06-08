import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

}

export default Register;
