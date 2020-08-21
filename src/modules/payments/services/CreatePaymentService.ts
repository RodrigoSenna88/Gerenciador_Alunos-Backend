import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IRegistersRepository from '@modules/registers/repositories/IRegistersRepository';

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
    @inject('PaymentsRepository')
    private paymentsRepository: IPaymentsRepository,

    @inject('RegistersRepository')
    private registersRepository: IRegistersRepository,
  ) {}

  public async execute({
    student_id,
    month,
    payment,
  }: IRequest): Promise<Payment> {
    const student = student_id;

    const findStudentRegistred = await this.registersRepository.findByStudent(
      student,
    );

    if (!findStudentRegistred) {
      throw new AppError('This student was not registred');
    }

    const toPay = await this.paymentsRepository.payment({
      student_id,
      month,
      payment,
    });

    return toPay;
  }
}

export default CreatePaymentService;
