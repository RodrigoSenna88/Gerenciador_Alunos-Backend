import { Router } from 'express';
import registersRouter from '../routes/registers.routes';
import usersRouter from '../routes/users.routes';
import sessionsRouter from '../routes/sessions.routes';

const routes = Router();

routes.use('/registers', registersRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
