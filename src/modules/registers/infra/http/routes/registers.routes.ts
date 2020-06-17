import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import RegistersController from '../controllers/RegistersController';

// DTO - Data Transfer Object

const registersRouter = Router();
const registersController = new RegistersController();

registersRouter.use(ensureAuthenticated);

// registersRouter.get('/', async (request, response) => {
//   const registers = await registersRepository.find();

//   return response.json(registers);
// });
// POST http://localhost:3333/registers

registersRouter.post('/', registersController.create);

export default registersRouter;
