import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';

import Payment from '../infra/typeorm/entities/Payment';
import IPaymentsRepository from '../repositories/IPaymentsRepository';

interface IRequest {
  student: string;
  responsible: string;
  month: string;
  payment: boolean;
}
@injectable()
class CreatePaymentService {
  constructor(
    @inject('RegistersRepository')
    private paymentsRepository: IPaymentsRepository,
  ) {}

  public async execute({
    student,
    responsible,
    month,
    payment,
  }: IRequest): Promise<Payment> {
    const toPay = await this.paymentsRepository.payment({
      student,
      responsible,
      month,
      payment,
    });

    return toPay;
  }
}

export default CreatePaymentService;
