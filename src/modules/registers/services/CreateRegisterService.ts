import { startOfDay } from 'date-fns';

import AppError from '@shared/errors/AppError';

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

class CreateRegisterService {
  constructor(private registersRepository: IRegisterRepository) {}

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

    return register;
  }
}

export default CreateRegisterService;
