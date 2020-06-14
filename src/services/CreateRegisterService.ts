import { startOfDay } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Register from '../models/Register';
import RegistersRepository from '../repositories/RegistersRepository';

interface Request {
  manager: string;
  student: string;
  phone: number;
  responsible: string;
  startDate: Date;
  schedule: string;
}

class CreateRegisterService {
  public async execute({
    manager,
    student,
    phone,
    responsible,
    startDate,
    schedule,
  }: Request): Promise<Register> {
    const registersRepository = getCustomRepository(RegistersRepository);

    const registerDate = startOfDay(startDate);

    const registerStudent = student;

    // Verificação se o estudante já foi registrado

    const findStudentInSameName = await registersRepository.findByStudent(
      registerStudent,
    );

    if (findStudentInSameName) {
      throw new AppError('This student is already registred');
    }

    const register = registersRepository.create({
      manager,
      student,
      phone,
      responsible,
      startDate: registerDate,
      schedule,
    });

    await registersRepository.save(register);

    return register;
  }
}

export default CreateRegisterService;
