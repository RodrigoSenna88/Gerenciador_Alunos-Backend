import Payment from '@modules/payments/infra/typeorm/entities/Payment';
import ICreatePaymentDTO from '@modules/payments/dtos/ICreatePaymentDTO';

export default interface IPaymentRepository {
  payment(data: ICreatePaymentDTO): Promise<Payment>;
  findByPaymentId(id: string): Promise<Payment | undefined>;
  findAllPaymentsByRegister(register_id: string): Promise<Payment[]>;
  findRegister(register_id: string): Promise<Payment | undefined>;
  save(payment: Payment): Promise<Payment>;
}
