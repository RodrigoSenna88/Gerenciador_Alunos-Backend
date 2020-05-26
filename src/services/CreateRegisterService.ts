import { startOfDay } from 'date-fns';

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
  private registersRepository: RegistersRepository;

  constructor(registersRepository: RegistersRepository) {
    this.registersRepository = registersRepository;
  }

public execute({name, phone, responsable, startDate, schedule}: Request): Register {
  const registerDate = startOfDay(startDate)

  const register = this.registersRepository.create({
    name,
    phone,
    responsable,
    startDate: registerDate,
    schedule,
   });

   return register;
}
}

export default CreateRegisterService
