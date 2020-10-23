import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import RegistersController from '../controllers/RegistersController';

// DTO - Data Transfer Object

const registersRouter = Router();
const registersController = new RegistersController();

registersRouter.use(ensureAuthenticated);

// POST http://localhost:3333/registers

registersRouter.get('/', registersController.show);
registersRouter.get('/schedules', registersController.listRegisterBySchedule);
registersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      manager: Joi.string().uuid().required(),
      student: Joi.string().required(),
      phone: Joi.number().required(),
      responsible: Joi.string().required(),
      startDate: Joi.string().required(),
      schedule: Joi.string().required(),
    },
  }),
  registersController.create,
);

export default registersRouter;
