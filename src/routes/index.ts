import { Router } from 'express';
import registersRouter from '../routes/registers.routes';

const routes = Router();

routes.use('/registers', registersRouter);

export default routes;
