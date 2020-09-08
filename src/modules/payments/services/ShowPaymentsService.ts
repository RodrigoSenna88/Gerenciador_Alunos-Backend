import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Payment from '@modules/payments/infra/typeorm/entities/Payment';
import IPaymentsRepository from '@modules/payments/repositories/IPaymentsRepository';

import { request } from 'express';

@injectable()
class ShowPaymentsService {
  constructor(
    @inject('PaymentsRepository')
    private paymentsRepository: IPaymentsRepository,
  ) {}

  public async execute(): Promise<Payment[]> {
    const register_id = request.body;

    const findRegister = await this.paymentsRepository.findRegister(
      register_id,
    );

    if (!findRegister) {
      throw new AppError('Register not found.');
    }

    const paymentsByRegister = await this.paymentsRepository.findAllPaymentsByRegister();

    return paymentsByRegister;
  }
}

export default ShowPaymentsService;
