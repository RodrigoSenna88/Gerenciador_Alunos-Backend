import { getRepository, Repository } from 'typeorm';

import IPaymentsRepository from '@modules/payments/repositories/IPaymentsRepository';

import Payment from '@modules/payments/infra/typeorm/entities/Payment';
import ICreatePaymentDTO from '@modules/payments/dtos/ICreatePaymentDTO';

class PaymentRepository implements IPaymentsRepository {
  private ormRepository: Repository<Payment>;

  constructor() {
    this.ormRepository = getRepository(Payment);
  }

  public async payment({
    register_id,
    month,
    payment,
  }: ICreatePaymentDTO): Promise<Payment> {
    const toPay = this.ormRepository.create({
      register_id,
      month,
      payment,
    });

    await this.ormRepository.save(toPay);

    return toPay;
  }
}

export default PaymentRepository;
