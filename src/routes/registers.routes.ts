import { Router } from 'express';
import{ getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns'

import RegistersRepository from '../repositories/RegistersRepository';
import CreateRegisterService from '../services/CreateRegisterService';

//DTO - Data Transfer Object

const registersRouter = Router();

registersRouter.get('/', async (request, response) => {
  const registersRepository = getCustomRepository(RegistersRepository);
  const registers = await registersRepository.find();

  return response.json(registers);
})
// POST http://localhost:3333/registers

registersRouter.post('/', async (request, response) => {
try{
const { name, phone, responsable, startDate, schedule } = request.body;

const parsedDate = parseISO(startDate);

const createRegister = new CreateRegisterService();

const register = await createRegister.execute({name, phone, responsable, startDate: parsedDate, schedule})

return response.json(register);
} catch (err) {
  return response.status(400).json({ error: err.message });
}

});


export default registersRouter;
