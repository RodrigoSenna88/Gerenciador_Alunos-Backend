import { Router } from 'express';
import registersRouter from '@modules/registers/infra/http/routes/registers.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import paymentsRouter from '@modules/payments/infra/http/routes/payment.routes';

const routes = Router();

routes.use('/registers', registersRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/payments', paymentsRouter);

export default routes;
