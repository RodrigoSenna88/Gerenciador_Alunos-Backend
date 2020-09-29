import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Payment from '../infra/typeorm/entities/Payment';
import IPaymentsRepository from '../repositories/IPaymentsRepository';

interface IRequest {
  payment_id: string;
  month: string;
  payment: boolean;
}

@injectable()
class UpdatePaymentService {
  constructor(
    @inject('PaymentRepository')
    private paymentsRepository: IPaymentsRepository,
  ) {}

  public async execute({
    payment_id,
    month,
    payment,
  }: IRequest): Promise<Payment> {
    const findPayment = await this.paymentsRepository.findByPaymentId(
      payment_id,
    );

    if (!findPayment) {
      throw new AppError('This payment not found.');
    }

    const updatePayment = await this.paymentsRepository.update({
      month,
      payment,
    });

    return updatePayment;
  }
}

export default UpdatePaymentService;
