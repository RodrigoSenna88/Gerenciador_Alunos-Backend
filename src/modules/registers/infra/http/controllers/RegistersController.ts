import { Request, Response } from 'express';

import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateRegisterService from '@modules/registers/services/CreateRegisterService';

export default class RegistersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      manager,
      student,
      phone,
      responsible,
      startDate,
      schedule,
    } = request.body;

    const parsedDate = parseISO(startDate);

    const createRegister = container.resolve(CreateRegisterService);

    const register = await createRegister.execute({
      manager,
      student,
      phone,
      responsible,
      startDate: parsedDate,
      schedule,
    });

    return response.json(register);
  }
}
