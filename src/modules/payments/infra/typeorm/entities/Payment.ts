import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import Register from '@modules/registers/infra/typeorm/entities/Register';

@Entity('payments')
class Payment {
  @PrimaryColumn('uuid')
  @OneToOne(() => Register)
  @JoinColumn({ name: 'id' })
  id: Register;

  @OneToOne(() => Register)
  @JoinColumn({ name: 'student' })
  student: Register;

  @ManyToOne(() => Register)
  @JoinColumn({ name: 'responsible' })
  responsible: Register;

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
