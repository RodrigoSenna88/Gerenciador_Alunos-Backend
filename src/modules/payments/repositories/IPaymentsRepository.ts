import Payment from '@modules/payments/infra/typeorm/entities/Payment';
import ICreatePaymentDTO from '@modules/payments/dtos/ICreatePaymentDTO';
import IUpdatePaymentDTO from '../dtos/IUpdatePaymentDTO';

export default interface IPaymentRepository {
  payment(data: ICreatePaymentDTO): Promise<Payment>;
  findByPaymentId(id: string): Promise<Payment | undefined>;
  update(data: IUpdatePaymentDTO): Promise<Payment>;
  findAllPaymentsByRegister(register_id: string): Promise<Payment[]>;
  findRegister(register_id: string): Promise<Payment | undefined>;
}
