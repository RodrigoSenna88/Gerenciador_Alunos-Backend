import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
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
      `registerSchedule-list:${schedule}`,
    );

    if (!register) {
      const registerSchedule = schedule;
      register = await this.registersRepository.findRegisterBySchedule(
        registerSchedule,
      );

      if (!register) {
        throw new AppError('This schedule have no one registred.');
      }
    }

    console.log('A query no banco foi feita');

    await this.cacheProvider.save(
      `registerSchedule-list:${schedule}`,
      register,
    );


    return register;
  }

}

export default ShowRegisterByScheduleService;
