import { uuid } from 'uuidv4';

import IPaymentsRepository from '@modules/payments/repositories/IPaymentsRepository';
import ICreatePaymentDTO from '@modules/payments/dtos/ICreatePaymentDTO';

import Payment from '../../infra/typeorm/entities/Payment';

class FakePaymentsRepository implements IPaymentsRepository {
  private registers: Payment[] = [];

  public async payment({
    student_id,
    month,
    payment,
  }: ICreatePaymentDTO): Promise<Payment> {
    const toPay = new Payment();

    Object.assign(toPay, {
      id: uuid(),
      student_id,
      month,
      payment,
    });

    this.registers.push(toPay);

    return toPay;
  }
}

export default FakePaymentsRepository;
