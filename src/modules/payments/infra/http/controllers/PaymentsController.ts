import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ShowPaymentService from '@modules/payments/services/ShowPaymentsService';
import CreatePaymentService from '../../../services/CreatePaymentService';
import UpdatePaymentService from '../../../services/UpdatePaymentService';

export default class PaymentsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { register_id } = request.body;

    const listPaymentsById = container.resolve(ShowPaymentService);

    const listPayments = await listPaymentsById.execute({ register_id });

    return response.json(listPayments);
  }

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

  public async update(request: Request, response: Response): Promise<Response> {
    const { payment_id, payment } = request.body;

    const updatePayment = container.resolve(UpdatePaymentService);

    const paymentUpdated = await updatePayment.execute({
      payment_id,
      payment,
    });

    return response.json(paymentUpdated);
  }
}
