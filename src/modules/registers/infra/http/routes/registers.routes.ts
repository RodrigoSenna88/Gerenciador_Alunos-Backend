import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import RegistersController from '../controllers/RegistersController';

// DTO - Data Transfer Object

const registersRouter = Router();
const registersController = new RegistersController();

registersRouter.use(ensureAuthenticated);

// POST http://localhost:3333/registers

registersRouter.get('/', registersController.show);
registersRouter.post('/', registersController.create);

export default registersRouter;
