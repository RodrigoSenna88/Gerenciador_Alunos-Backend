import { Router } from 'express';
import { startOfDay, parseISO } from 'date-fns'

const registersRouter = Router();

interface Register {
  name: string;
  phone: number;
  responsable: string;
  startDate: Date;
  schedule: string;
}

const registers: Register[] = [];

// POST http://localhost:3333/registers

registersRouter.post('/', (request, response) => {
const { name, phone, responsable, startDate, schedule } = request.body;

const parsedDate = startOfDay(parseISO(startDate));

const register = {
  name,
  phone,
  responsable,
  startDate: parsedDate,
  schedule
}

registers.push(register)

return response.json(register)
})


export default registersRouter;
