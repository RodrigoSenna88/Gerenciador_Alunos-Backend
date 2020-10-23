import 'reflect-metadata';

import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Payment from '@modules/payments/infra/typeorm/entities/Payment';
import IPaymentsRepository from '@modules/payments/repositories/IPaymentsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  register_id: string;
}
@injectable()
class ShowPaymentsService {
  constructor(
    @inject('PaymentRepository')
    private paymentsRepository: IPaymentsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ register_id }: IRequest): Promise<Payment[]> {
    let paymentsByRegister = await this.cacheProvider.recover<Payment[]>(
      'payments-list',
    );

    const registerPayment = register_id;

    const findRegister = await this.paymentsRepository.findRegister(
      registerPayment,
    );

    if (!findRegister) {
      throw new AppError('Register not found.');
    }

    if (!paymentsByRegister) {
      paymentsByRegister = await this.paymentsRepository.findAllPaymentsByRegister(
        registerPayment,
      );

      console.log('invalidatePrefix funcionou');

      await this.cacheProvider.save('payments-list', paymentsByRegister);
    }

    return paymentsByRegister;
  }
}

export default ShowPaymentsService;
