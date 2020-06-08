import { startOfDay } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Register from '../models/Register';
import RegistersRepository from '../repositories/RegistersRepository';

interface Request {
  name: string;
  phone: number;
  responsable:string;
  startDate: Date;
  schedule: string;
}

class CreateRegisterService {
public async execute({name, phone, responsable, startDate, schedule}: Request): Promise<Register> {
  const registersRepository = getCustomRepository(RegistersRepository);

  const registerDate = startOfDay(startDate)

  const registerStudent = name

  // Verificação se o estudante já foi registrado

  const findStudentInSameName = await registersRepository.findByStudent(
    registerStudent,
  );

  if (findStudentInSameName) {
    throw Error('This student is already registred');
  }

  const register = registersRepository.create({
    name,
    phone,
    responsable,
    startDate: registerDate,
    schedule,
   });

   await registersRepository.save(register)

   return register;
  }
}

export default CreateRegisterService
