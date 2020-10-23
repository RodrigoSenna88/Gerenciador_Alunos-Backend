import { injectable, inject } from 'tsyringe';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

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

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ schedule }: IRequest): Promise<Register[]> {
    let register = await this.cacheProvider.recover<Register[]>(
      `register-list:${schedule}`,
    );
    const registerSchedule = schedule;

    if (!register) {
      register = await this.registersRepository.findRegisterBySchedule(
        registerSchedule,
      );

      await this.cacheProvider.save(`register-list:${schedule}`, register);
    }

    const registersList = register;

    if (!registersList) {
      throw new AppError('This schedule have no one registred.');
    }

    return registersList;
  }
}

export default ShowRegisterByScheduleService;
