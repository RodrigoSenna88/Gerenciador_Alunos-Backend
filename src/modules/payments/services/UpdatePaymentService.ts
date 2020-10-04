import 'reflect-metadata';

import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Payment from '../infra/typeorm/entities/Payment';
import IPaymentsRepository from '../repositories/IPaymentsRepository';

interface IRequest {
  payment_id: string;
  payment: boolean;
}

@injectable()
class UpdatePaymentService {
  constructor(
    @inject('PaymentRepository')
    private paymentsRepository: IPaymentsRepository,
  ) {}

  public async execute({ payment_id, payment }: IRequest): Promise<Payment> {
    const paymentdb = await this.paymentsRepository.findByPaymentId(payment_id);

    if (!paymentdb) {
      throw new AppError('This payment not found.');
    }

    paymentdb.payment = payment;

    return this.paymentsRepository.save(paymentdb);
  }
}

export default UpdatePaymentService;
