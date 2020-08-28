import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import Register from '@modules/registers/infra/typeorm/entities/Register';

@Entity('payments')
class Payment {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  register_id: string;

  @OneToOne(() => Register)
  @JoinColumn({ name: 'register_id' })
  register: Register;

  @Column()
  month: string;

  @Column()
  payment: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Payment;
