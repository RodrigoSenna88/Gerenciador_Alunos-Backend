import AppError from '@shared/errors/AppError';

import ShowPaymentService from '@modules/payments/services/ShowPaymentsService';

import FakeRegistersRepository from '@modules/registers/repositories/fakes/FakeRegistersRepository';
import FakePaymentsRepository from '@modules/payments/repositories/fakes/FakePaymentsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import CreatePaymentService from '@modules/payments/services/CreatePaymentService';
import CreateRegisterService from '@modules/registers/services/CreateRegisterService';

let fakeRegistersRepository: FakeRegistersRepository;
let fakePaymentsRepository: FakePaymentsRepository;
let fakeCacheProvider: FakeCacheProvider;

let createPayment: CreatePaymentService;
let createRegister: CreateRegisterService;

let showPayment: ShowPaymentService;

describe('ShowPayment', () => {
  beforeEach(() => {
    fakeRegistersRepository = new FakeRegistersRepository();
    fakePaymentsRepository = new FakePaymentsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    createPayment = new CreatePaymentService(
      fakePaymentsRepository,
      fakeRegistersRepository,
      fakeCacheProvider,
    );

    showPayment = new ShowPaymentService(
      fakePaymentsRepository,
      fakeCacheProvider,
    );

    createRegister = new CreateRegisterService(
      fakeRegistersRepository,
      fakeCacheProvider,
    );
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

    const showPayments = await showPayment.execute({
      register_id: register.id,
    });

    expect(showPayments).toEqual([payment1, payment2]);
  });

  it('Should not be able to show the payments', async () => {
    await expect(
      showPayment.execute({
        register_id: 'id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
