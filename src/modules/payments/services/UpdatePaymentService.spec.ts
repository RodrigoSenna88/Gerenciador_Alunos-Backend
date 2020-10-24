// import AppError from '@shared/errors/AppError';

import FakeRegistersRepository from '@modules/registers/repositories/fakes/FakeRegistersRepository';
import FakePaymentsRepository from '@modules/payments/repositories/fakes/FakePaymentsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import CreatePaymentService from '@modules/payments/services/CreatePaymentService';
import UpdatePaymentService from '@modules/payments/services/UpdatePaymentService';
import CreateRegisterService from '@modules/registers/services/CreateRegisterService';

let fakeRegistersRepository: FakeRegistersRepository;
let fakePaymentsRepository: FakePaymentsRepository;
let fakeCacheProvider: FakeCacheProvider;

let createPayment: CreatePaymentService;
let createRegister: CreateRegisterService;

let updatePayment: UpdatePaymentService;

describe('UpdatePayment', () => {
  beforeEach(() => {
    fakeRegistersRepository = new FakeRegistersRepository();
    fakePaymentsRepository = new FakePaymentsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    createPayment = new CreatePaymentService(
      fakePaymentsRepository,
      fakeRegistersRepository,
      fakeCacheProvider,
    );
    updatePayment = new UpdatePaymentService(fakePaymentsRepository);

    createRegister = new CreateRegisterService(
      fakeRegistersRepository,
      fakeCacheProvider,
    );
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
      payment: true,
    });

    // expect(update.payment_id).toBe(toPay.id);
    expect(update.month).toBe('august');
    expect(update.payment).toBe(true);
  });
});
