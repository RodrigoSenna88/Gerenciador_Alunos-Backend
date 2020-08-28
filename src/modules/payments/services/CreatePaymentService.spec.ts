import AppError from '@shared/errors/AppError';

import FakeRegistersRepository from '@modules/registers/repositories/fakes/FakeRegistersRepository';
import FakePaymentsRepository from '@modules/payments/repositories/fakes/FakePaymentsRepository';

import CreatePaymentService from '@modules/payments/services/CreatePaymentService';
import CreateRegisterService from '@modules/registers/services/CreateRegisterService';

let fakeRegistersRepository: FakeRegistersRepository;
let fakePaymentsRepository: FakePaymentsRepository;

let createPayment: CreatePaymentService;
let createRegister: CreateRegisterService;

describe('CreatePayment', () => {
  beforeEach(() => {
    fakeRegistersRepository = new FakeRegistersRepository();
    fakePaymentsRepository = new FakePaymentsRepository();
    createPayment = new CreatePaymentService(
      fakePaymentsRepository,
      fakeRegistersRepository,
    );

    createRegister = new CreateRegisterService(fakeRegistersRepository);
  });

  it('Should be able to create a new payment', async () => {
    const register = await createRegister.execute({
      manager: 'manager',
      student: 'student',
      phone: 1234567890,
      responsible: 'responsible',
      startDate: new Date(),
      schedule: 'schedule',
    });

    const toPay = await createPayment.execute({
      register_id: register.id,
      month: 'august',
      payment: true,
    });

    expect(toPay.register_id).toBe(register.id);
    expect(toPay.month).toBe('august');
    expect(toPay.payment).toBe(true);
  });

  it('Should not be able to create a new payment without an student registred', async () => {
    await expect(
      createPayment.execute({
        register_id: 'student',
        month: 'august',
        payment: true,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
