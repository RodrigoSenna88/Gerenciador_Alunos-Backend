import { Router } from 'express';
import { startOfDay, parseISO } from 'date-fns'

import RegistersRepository from '../repositories/RegistersRepository';

const registersRouter = Router();
const registersRepository = new RegistersRepository();


// POST http://localhost:3333/registers

registersRouter.post('/', (request, response) => {
const { name, phone, responsable, startDate, schedule } = request.body;

const parsedDate = startOfDay(parseISO(startDate));


const register = registersRepository.create(name, phone, responsable, startDate, schedule);

return response.json(register)
})


export default registersRouter;
