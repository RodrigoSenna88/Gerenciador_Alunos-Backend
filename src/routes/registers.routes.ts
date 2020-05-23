import { Router } from 'express';
import { startOfDay, parseISO } from 'date-fns'

import Register from '../models/Register';

const registersRouter = Router();



const registers: Register[] = [];

// POST http://localhost:3333/registers

registersRouter.post('/', (request, response) => {
const { name, phone, responsable, startDate, schedule } = request.body;

const parsedDate = startOfDay(parseISO(startDate));

const register = new Register(name, phone,  responsable,  parsedDate,  schedule);

registers.push(register)

return response.json(register)
})


export default registersRouter;
