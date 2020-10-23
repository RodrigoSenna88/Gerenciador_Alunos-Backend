import { startOfDay } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Register from '../infra/typeorm/entities/Register';
import IRegisterRepository from '../repositories/IRegistersRepository';

interface IRequest {
  manager: string;
  student: string;
  phone: number;
  responsible: string;
  startDate: Date;
  schedule: string;
}
@injectable()
class CreateRegisterService {
  constructor(
    @inject('RegistersRepository')
    private registersRepository: IRegisterRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    manager,
    student,
    phone,
    responsible,
    startDate,
    schedule,
  }: IRequest): Promise<Register> {
    const registerDate = startOfDay(startDate);

    const registerStudent = student;

    // Verificação se o estudante já foi registrado

    const findStudentInSameName = await this.registersRepository.findByStudent(
      registerStudent,
    );

    if (findStudentInSameName) {
      throw new AppError('This student is already registred');
    }

    const register = await this.registersRepository.create({
      manager,
      student,
      phone,
      responsible,
      startDate: registerDate,
      schedule,
    });

    await this.cacheProvider.invalidate('register-list');

    return register;
  }
}

export default CreateRegisterService;
