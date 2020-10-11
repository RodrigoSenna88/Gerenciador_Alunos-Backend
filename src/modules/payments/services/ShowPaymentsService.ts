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
    const cacheData = await this.cacheProvider.recover('asd');

    console.log(cacheData);

    const registerPayment = register_id;

    const findRegister = await this.paymentsRepository.findRegister(
      registerPayment,
    );

    if (!findRegister) {
      throw new AppError('Register not found.');
    }

    const paymentsByRegister = await this.paymentsRepository.findAllPaymentsByRegister(
      registerPayment,
    );

    // await this.cacheProvider.save('asd', 'asd');

    return paymentsByRegister;
  }
}

export default ShowPaymentsService;
