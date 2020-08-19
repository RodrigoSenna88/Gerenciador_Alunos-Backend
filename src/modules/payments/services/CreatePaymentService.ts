import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';

import Payment from '../infra/typeorm/entities/Payment';
import IPaymentsRepository from '../repositories/IPaymentsRepository';

interface IRequest {
  student_id: string;
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
    student_id,
    month,
    payment,
  }: IRequest): Promise<Payment> {
    const toPay = await this.paymentsRepository.payment({
      student_id,
      month,
      payment,
    });

    return toPay;
  }
}

export default CreatePaymentService;
