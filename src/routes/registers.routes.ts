import { Router } from 'express';
import { parseISO } from 'date-fns'

import RegistersRepository from '../repositories/RegistersRepository';
import CreateRegisterService from '../services/CreateRegisterService';

//DTO - Data Transfer Object

const registersRouter = Router();
const registersRepository = new RegistersRepository();

registersRouter.get('/', (request, response) => {
  const registers = registersRepository.all();

  return response.json(registers);
})
// POST http://localhost:3333/registers

registersRouter.post('/', (request, response) => {
const { name, phone, responsable, startDate, schedule } = request.body;

const parsedDate = parseISO(startDate);

const createRegister = new CreateRegisterService(registersRepository);

const register = createRegister.execute({name, phone, responsable, startDate: parsedDate, schedule})

return response.json(register)
})


export default registersRouter;
