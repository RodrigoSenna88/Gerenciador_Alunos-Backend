import { uuid } from 'uuidv4';

import IPaymentsRepository from '@modules/payments/repositories/IPaymentsRepository';
import ICreatePaymentDTO from '@modules/payments/dtos/ICreatePaymentDTO';

import Payment from '../../infra/typeorm/entities/Payment';

class FakePaymentsRepository implements IPaymentsRepository {
  private payments: Payment[] = [];

  public async payment({
    register_id,
    month,
    payment,
  }: ICreatePaymentDTO): Promise<Payment> {
    const toPay = new Payment();

    Object.assign(toPay, {
      id: uuid(),
      register_id,
      month,
      payment,
    });

    this.payments.push(toPay);

    return toPay;
  }
}

export default FakePaymentsRepository;
