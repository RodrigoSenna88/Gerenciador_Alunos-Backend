import 'reflect-metadata';

import { injectable, inject } from 'tsyringe';

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
  ) {}

  public async execute(): Promise<Register[]> {
    const register = await this.registersRepository.findAllRegisters();

    if (!register) {
      throw new AppError('Register is empity');
    }

    return register;
  }
}

export default ShowRegisterService;
