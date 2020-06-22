import AppError from '@shared/errors/AppError';

import FakeRegistersRepository from '../repositories/fakes/FakeRegistersRepository';

import CreateRegisterService from './CreateRegisterService';

describe('CreateRegister', () => {
  it('Should be able to create a new register', async () => {
    const fakeRegistersRepository = new FakeRegistersRepository();
    const createRegister = new CreateRegisterService(fakeRegistersRepository);

    const newDate = new Date();

    const register = await createRegister.execute({
      manager: 'manager',
      student: 'student',
      phone: 1234567890,
      responsible: 'responsible',
      startDate: newDate,
      schedule: 'schedule',
    });

    expect(register).toHaveProperty('id');
    expect(register.manager).toBe('manager');
    expect(register.student).toBe('student');
    expect(register.phone).toBe(1234567890);
    expect(register.responsible).toBe('responsible');
    expect(register.startDate).toBe(newDate);
    expect(register.schedule).toBe('schedule');
  });

  it('Should not be able to create a two register with the same student', async () => {
    const fakeRegistersRepository = new FakeRegistersRepository();
    const createRegister = new CreateRegisterService(fakeRegistersRepository);

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
