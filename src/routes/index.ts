import { Router } from 'express';
import registersRouter from '../routes/registers.routes';
import usersRouter from '../routes/users.routes';

const routes = Router();

routes.use('/registers', registersRouter);
routes.use('/users', usersRouter);

export default routes;
