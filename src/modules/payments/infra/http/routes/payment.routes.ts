import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import PaymentsController from '@modules/payments/infra/http/controllers/PaymentsController';

// DTO - Data Transfer Object

const paymentsRouter = Router();
const paymentsController = new PaymentsController();

paymentsRouter.use(ensureAuthenticated);

// POST http://localhost:3333/registers

paymentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      register_id: Joi.string().uuid().required(),
      month: Joi.string().required(),
      payment: Joi.boolean().required(),
    },
  }),
  paymentsController.create,
);

paymentsRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      payment_id: Joi.string().uuid().required(),
      payment: Joi.boolean().required(),
    },
  }),
  paymentsController.update,
);

paymentsRouter.get('/', paymentsController.show);

export default paymentsRouter;
