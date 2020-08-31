import { getRepository, Repository } from 'typeorm';

import IPaymentsRepository from '@modules/payments/repositories/IPaymentsRepository';

import Payment from '@modules/payments/infra/typeorm/entities/Payment';
import ICreatePaymentDTO from '@modules/payments/dtos/ICreatePaymentDTO';
import IUpdatePaymentDTO from '@modules/payments/dtos/IUpdatePaymentDTO';

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

  public async findByPaymentId(id: string): Promise<Payment | undefined> {
    const findPayment = await this.ormRepository.findOne({
      where: { id },
    });

    return findPayment;
  }

  public async update({ month, payment }: IUpdatePaymentDTO): Promise<Payment> {
    const update = this.ormRepository.create({
      month,
      payment,
    });

    await this.ormRepository.save(update);

    return update;
  }
}

export default PaymentRepository;
