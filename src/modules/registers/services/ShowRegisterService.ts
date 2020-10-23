import 'reflect-metadata';

import { injectable, inject } from 'tsyringe';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import AppError from '@shared/errors/AppError';

import Register from '../infra/typeorm/entities/Register';
import IRegisterRepository from '../repositories/IRegistersRepository';

interface IRequest {
  register_id: string;
}
@injectable()
class ShowRegisterService {
  constructor(
    @inject('RegistersRepository')
    private registersRepository: IRegisterRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(): Promise<Register[]> {
    let register = await this.cacheProvider.recover<Register[]>(
      'register-list',
    );

    if (!register) {
      register = await this.registersRepository.findAllRegisters();

      console.log('invalidatePrefix funcionou');

      await this.cacheProvider.save('register-list', register);
    }

    const registerList = register;

    if (!registerList) {
      throw new AppError('Register is empity');
    }

    return registerList;
  }
}

export default ShowRegisterService;
