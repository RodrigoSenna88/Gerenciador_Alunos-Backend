import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Register from '../infra/typeorm/entities/Register';
import IRegisterRepository from '../repositories/IRegistersRepository';

interface IRequest {
  schedule: string;
}

@injectable()
class ShowRegisterByScheduleService {
  constructor(
    @inject('RegistersRepository')
    private registersRepository: IRegisterRepository,
  ) {}

  public async execute({ schedule }: IRequest): Promise<Register[]> {
    const registerSchedule = schedule;
    const register = await this.registersRepository.findRegisterBySchedule(
      registerSchedule,
    );

    if (!register) {
      throw new AppError('This schedule have no one registred.');
    }

    return register;
  }
}

export default ShowRegisterByScheduleService;
