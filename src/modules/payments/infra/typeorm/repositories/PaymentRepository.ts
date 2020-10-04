import { getRepository, Repository } from 'typeorm';

import IPaymentsRepository from '@modules/payments/repositories/IPaymentsRepository';

import Payment from '@modules/payments/infra/typeorm/entities/Payment';
import ICreatePaymentDTO from '@modules/payments/dtos/ICreatePaymentDTO';

class PaymentRepository implements IPaymentsRepository {
  private ormRepository: Repository<Payment>;

  constructor() {
    this.ormRepository = getRepository(Payment);
  }

  public async findRegister(register_id: string): Promise<Payment | undefined> {
    const findRegister = await this.ormRepository.findOne({
      where: { register_id },
    });

    return findRegister;
  }

  public async findAllPaymentsByRegister(
    register_id: string,
  ): Promise<Payment[]> {
    const findAllPayment = await this.ormRepository.find({
      where: { register_id },
    });

    return findAllPayment;
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

  public async save(payment: Payment): Promise<Payment> {
    return this.ormRepository.save(payment);
  }
}

export default PaymentRepository;
