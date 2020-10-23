import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateRegisterService from '@modules/registers/services/CreateRegisterService';
import ShowRegisterService from '@modules/registers/services/ShowRegisterService';
import ShowRegisterByScheduleService from '@modules/registers/services/ShowRegisterByScheduleService';

export default class RegistersController {
  public async show(request: Request, response: Response): Promise<Response> {
    const showRegister = container.resolve(ShowRegisterService);

    const register = await showRegister.execute();

    return response.json(register);
  }

  public async listRegisterBySchedule(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { schedule } = request.body;

    const listBySchedule = container.resolve(ShowRegisterByScheduleService);

    const listregister = await listBySchedule.execute({ schedule });

    return response.json(listregister);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      manager,
      student,
      phone,
      responsible,
      startDate,
      schedule,
    } = request.body;

    const createRegister = container.resolve(CreateRegisterService);

    const register = await createRegister.execute({
      manager,
      student,
      phone,
      responsible,
      startDate,
      schedule,
    });

    return response.json(register);
  }
}
