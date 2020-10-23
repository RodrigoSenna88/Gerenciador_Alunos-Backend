import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IRegistersRepository from '@modules/registers/repositories/IRegistersRepository';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Payment from '../infra/typeorm/entities/Payment';
import IPaymentsRepository from '../repositories/IPaymentsRepository';

interface IRequest {
  register_id: string;
  month: string;
  payment: boolean;
}

@injectable()
class CreatePaymentService {
  constructor(
    @inject('PaymentRepository')
    private paymentsRepository: IPaymentsRepository,

    @inject('RegistersRepository')
    private registersRepository: IRegistersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    register_id,
    month,
    payment,
  }: IRequest): Promise<Payment> {
    const findStudentRegistred = await this.registersRepository.findByRegisterId(
      register_id,
    );

    if (!findStudentRegistred) {
      throw new AppError('This student was not registred');
    }

    const toPay = await this.paymentsRepository.payment({
      register_id,
      month,
      payment,
    });

    await this.cacheProvider.invalidatePrefix('payments-list');

    return toPay;
  }
}

export default CreatePaymentService;
