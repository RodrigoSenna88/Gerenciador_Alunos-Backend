import Payment from '@modules/payments/infra/typeorm/entities/Payment';
import ICreatePaymentDTO from '@modules/payments/dtos/ICreatePaymentDTO';

export default interface IPaymentRepository {
  payment(data: ICreatePaymentDTO): Promise<Payment>;
  // deletePayment(payment: boolean): Promise<Payment>;
}
