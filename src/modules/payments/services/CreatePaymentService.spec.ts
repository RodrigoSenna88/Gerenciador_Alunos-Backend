// import AppError from '@shared/errors/AppError';

import FakePaymentsRepository from '@modules/payments/repositories/fakes/FakePaymentsRepository';

import CreatePaymentService from '@modules/payments/services/CreatePaymentService';

let fakePaymentsRepository: FakePaymentsRepository;
let createPayment: CreatePaymentService;

describe('CreatePayment', () => {
  beforeEach(() => {
    fakePaymentsRepository = new FakePaymentsRepository();
    createPayment = new CreatePaymentService(fakePaymentsRepository);
  });

  it('Should be able to create a new payment', async () => {
    const toPay = await createPayment.execute({
      student_id: 'student',
      month: 'august',
      payment: true,
    });

    expect(toPay.student_id).toBe('student');
    expect(toPay.month.toString()).toBe('august');
    expect(toPay.payment).toBe(true);
  });
});
