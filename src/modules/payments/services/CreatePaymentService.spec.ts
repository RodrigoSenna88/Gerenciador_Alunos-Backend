import AppError from '@shared/errors/AppError';

import FakeRegistersRepository from '@modules/registers/repositories/fakes/FakeRegistersRepository';
import FakePaymentsRepository from '@modules/payments/repositories/fakes/FakePaymentsRepository';

import CreatePaymentService from '@modules/payments/services/CreatePaymentService';

let fakeRegistersRepository: FakeRegistersRepository;
let fakePaymentsRepository: FakePaymentsRepository;
let createPayment: CreatePaymentService;

describe('CreatePayment', () => {
  beforeEach(() => {
    fakeRegistersRepository = new FakeRegistersRepository();
    fakePaymentsRepository = new FakePaymentsRepository();
    createPayment = new CreatePaymentService(
      fakePaymentsRepository,
      fakeRegistersRepository,
    );
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

  it('Should not be able to create a new payment without an student registred', async () => {
    await createPayment.execute({
      student_id: 'student1',
      month: 'august',
      payment: true,
    });

    await expect(
      createPayment.execute({
        student_id: 'student',
        month: 'august',
        payment: true,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
