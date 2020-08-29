import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreatePaymentService from '../../../services/CreatePaymentService';

export default class PaymentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { register_id, month, payment } = request.body;

    const createPayment = container.resolve(CreatePaymentService);

    const toPay = await createPayment.execute({
      register_id,
      month,
      payment,
    });

    return response.json(toPay);
  }
}
