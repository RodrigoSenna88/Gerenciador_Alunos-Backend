import AppError from '@shared/errors/AppError';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeRegistersRepository from '../repositories/fakes/FakeRegistersRepository';

import CreateRegisterService from './CreateRegisterService';

let fakeRegistersRepository: FakeRegistersRepository;
let fakeCacheProvider: FakeCacheProvider;
let createRegister: CreateRegisterService;

describe('CreateRegister', () => {
  beforeEach(() => {
    fakeRegistersRepository = new FakeRegistersRepository();
    fakeCacheProvider = new FakeCacheProvider();
    createRegister = new CreateRegisterService(
      fakeRegistersRepository,
      fakeCacheProvider,
    );
  });

  it('Should be able to create a new register', async () => {
    const fakeDate = new Date('6/22/2020');

    const register = await createRegister.execute({
      manager: 'manager',
      student: 'student',
      phone: 1234567890,
      responsible: 'responsible',
      startDate: fakeDate,
      schedule: 'schedule',
    });

    expect(register).toHaveProperty('id');
    expect(register.manager).toBe('manager');
    expect(register.student).toBe('student');
    expect(register.phone).toBe(1234567890);
    expect(register.responsible).toBe('responsible');
    expect(register.startDate.toString()).toBe(fakeDate.toString());
    expect(register.schedule).toBe('schedule');
  });

  it('Should not be able to create a two register with the same student', async () => {
    const registerStudent = 'student';

    await createRegister.execute({
      manager: 'manager',
      student: registerStudent,
      phone: 1234567890,
      responsible: 'responsible',
      startDate: new Date(),
      schedule: 'schedule',
    });

    await expect(
      createRegister.execute({
        manager: 'manager',
        student: registerStudent,
        phone: 1234567890,
        responsible: 'responsible',
        startDate: new Date(),
        schedule: 'schedule',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
