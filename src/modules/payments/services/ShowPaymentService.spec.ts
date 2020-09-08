// import AppError from '@shared/errors/AppError';

import FakeRegistersRepository from '@modules/registers/repositories/fakes/FakeRegistersRepository';
import FakePaymentsRepository from '@modules/payments/repositories/fakes/FakePaymentsRepository';

import CreatePaymentService from '@modules/payments/services/CreatePaymentService';
import CreateRegisterService from '@modules/registers/services/CreateRegisterService';

let fakeRegistersRepository: FakeRegistersRepository;
let fakePaymentsRepository: FakePaymentsRepository;

let createPayment: CreatePaymentService;
let createRegister: CreateRegisterService;

describe('ShowPayment', () => {
  beforeEach(() => {
    fakeRegistersRepository = new FakeRegistersRepository();
    fakePaymentsRepository = new FakePaymentsRepository();
    createPayment = new CreatePaymentService(
      fakePaymentsRepository,
      fakeRegistersRepository,
    );

    createRegister = new CreateRegisterService(fakeRegistersRepository);
  });

  it('Should be able to show the payments', async () => {
    const register = await createRegister.execute({
      manager: 'manager',
      student: 'student',
      phone: 1234567890,
      responsible: 'responsible',
      startDate: new Date(),
      schedule: 'schedule',
    });

    const payment1 = await createPayment.execute({
      register_id: register.id,
      month: 'august',
      payment: true,
    });
    const payment2 = await createPayment.execute({
      register_id: register.id,
      month: 'september',
      payment: false,
    });

    const listPayments = await fakePaymentsRepository.findAllPaymentsByRegister();

    expect(listPayments).toEqual([payment1, payment2]);
  });
});
