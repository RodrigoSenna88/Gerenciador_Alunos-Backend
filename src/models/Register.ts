import { Entity, Column,  } from 'typeorm';

@Entity('registers')
class Register {
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
