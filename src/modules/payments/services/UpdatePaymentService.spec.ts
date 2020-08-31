// import AppError from '@shared/errors/AppError';

import FakeRegistersRepository from '@modules/registers/repositories/fakes/FakeRegistersRepository';
import FakePaymentsRepository from '@modules/payments/repositories/fakes/FakePaymentsRepository';

import CreatePaymentService from '@modules/payments/services/CreatePaymentService';
import UpdatePaymentService from '@modules/payments/services/UpdatePaymentService';
import CreateRegisterService from '@modules/registers/services/CreateRegisterService';

let fakeRegistersRepository: FakeRegistersRepository;
let fakePaymentsRepository: FakePaymentsRepository;

let createPayment: CreatePaymentService;
let createRegister: CreateRegisterService;

let updatePayment: UpdatePaymentService;

describe('UpdatePayment', () => {
  beforeEach(() => {
    fakeRegistersRepository = new FakeRegistersRepository();
    fakePaymentsRepository = new FakePaymentsRepository();
    createPayment = new CreatePaymentService(
      fakePaymentsRepository,
      fakeRegistersRepository,
    );
    updatePayment = new UpdatePaymentService(fakePaymentsRepository);

    createRegister = new CreateRegisterService(fakeRegistersRepository);
  });

  it('Should be able to update a payment', async () => {
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
      payment: false,
    });

    const update = await updatePayment.execute({
      payment_id: toPay.id,
      month: 'august',
      payment: true,
    });

    expect(update.month).toBe('august');
    expect(update.payment).toBe(true);
  });
});
