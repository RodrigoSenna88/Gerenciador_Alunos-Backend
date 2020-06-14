import { Router } from 'express';
import registersRouter from './registers.routes';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/registers', registersRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
