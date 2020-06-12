import { Router } from 'express';
import{ getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns'

import RegistersRepository from '../repositories/RegistersRepository';
import CreateRegisterService from '../services/CreateRegisterService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

//DTO - Data Transfer Object

const registersRouter = Router();

registersRouter.use(ensureAuthenticated);

registersRouter.get('/', async (request, response) => {
  const registersRepository = getCustomRepository(RegistersRepository);
  const registers = await registersRepository.find();

  return response.json(registers);
})
// POST http://localhost:3333/registers

registersRouter.post('/', async (request, response) => {
try{
const { manager, student, phone, responsible, startDate, schedule } = request.body;

const parsedDate = parseISO(startDate);

const createRegister = new CreateRegisterService();

const register = await createRegister.execute({ manager, student, phone, responsible, startDate: parsedDate, schedule})

return response.json(register);
} catch (err) {
  return response.status(400).json({ error: err.message });
}

});


export default registersRouter;
