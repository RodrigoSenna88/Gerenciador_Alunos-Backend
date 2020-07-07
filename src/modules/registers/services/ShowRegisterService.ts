import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Register from '../infra/typeorm/entities/Register';
import IRegisterRepository from '../repositories/IRegistersRepository';

interface IRequest {
  register_id: string;
}
@injectable()
class CreateRegisterService {
  constructor(
    @inject('RegistersRepository')
    private registersRepository: IRegisterRepository,
  ) {}

  public async execute({ register_id }: IRequest): Promise<Register> {
    const register = await this.registersRepository.findById(register_id);

    if (!register) {
      throw new AppError('Register is empity');
    }

    return register;
  }
}

export default CreateRegisterService;
