import { uuid } from 'uuidv4';

import IPaymentsRepository from '@modules/payments/repositories/IPaymentsRepository';
import ICreatePaymentDTO from '@modules/payments/dtos/ICreatePaymentDTO';

import Payment from '../../infra/typeorm/entities/Payment';

class FakePaymentsRepository implements IPaymentsRepository {
  private payments: Payment[] = [];

  public async findRegister(register_id: string): Promise<Payment | undefined> {
    const findRegister = this.payments.find(
      (payment) => payment.register_id === register_id,
    );
    return findRegister;
  }

  public async findAllPaymentsByRegister(
    register_id: string,
  ): Promise<Payment[]> {
    const listPayments = this.payments.filter(
      (payment) => payment.register_id === register_id,
    );

    return listPayments;
  }

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

  public async findByPaymentId(id: string): Promise<Payment | undefined> {
    const findPayment = this.payments.find((payment) => payment.id === id);
    return findPayment;
  }

  public async save(payment: Payment): Promise<Payment> {
    const findIndex = this.payments.findIndex(
      (findPayment) => findPayment.id === payment.id,
    );

    this.payments[findIndex] = payment;

    return payment;
  }
}
export default FakePaymentsRepository;
