import { Router } from 'express';
import { parseISO } from 'date-fns';

import RegistersRepository from '@modules/registers/infra/typeorm/repositories/RegistersRepository';
import CreateRegisterService from '@modules/registers/services/CreateRegisterService';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

// DTO - Data Transfer Object

const registersRouter = Router();
const registersRepository = new RegistersRepository();

registersRouter.use(ensureAuthenticated);

// registersRouter.get('/', async (request, response) => {
//   const registers = await registersRepository.find();

//   return response.json(registers);
// });
// POST http://localhost:3333/registers

registersRouter.post('/', async (request, response) => {
  const {
    manager,
    student,
    phone,
    responsible,
    startDate,
    schedule,
  } = request.body;

  const parsedDate = parseISO(startDate);

  const createRegister = new CreateRegisterService(registersRepository);

  const register = await createRegister.execute({
    manager,
    student,
    phone,
    responsible,
    startDate: parsedDate,
    schedule,
  });

  return response.json(register);
});

export default registersRouter;
