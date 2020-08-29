import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IRegistersRepository from '@modules/registers/repositories/IRegistersRepository';

import Payment from '../infra/typeorm/entities/Payment';
import IPaymentsRepository from '../repositories/IPaymentsRepository';

interface IRequest {
  register_id: string;
  month: string;
  payment: boolean;
}

@injectable()
class UpdatePaymentService {
  constructor(
    @inject('PaymentsRepository')
    private paymentsRepository: IPaymentsRepository,

    @inject('RegistersRepository')
    private registersRepository: IRegistersRepository,
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

    // await this.paymentsRepository.deletePayment(payment);

    const updateToPay = await this.paymentsRepository.payment({
      register_id,
      month,
      payment,
    });

    return updateToPay;
  }
}

export default UpdatePaymentService;
