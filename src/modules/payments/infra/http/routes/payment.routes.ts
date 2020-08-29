import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import PaymentsController from '@modules/payments/infra/http/controllers/PaymentsController';

// DTO - Data Transfer Object

const paymentsRouter = Router();
const paymentsController = new PaymentsController();

paymentsRouter.use(ensureAuthenticated);

// POST http://localhost:3333/registers

paymentsRouter.post('/', paymentsController.create);

export default paymentsRouter;
