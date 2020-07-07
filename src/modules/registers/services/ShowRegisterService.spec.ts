import AppError from '@shared/errors/AppError';

import registersRouter from '@modules/registers/infra/http/routes/registers.routes';
import FakeRegistersRepository from '../repositories/fakes/FakeRegistersRepository';

import ShowRegisterService from './ShowRegisterService';

let fakeRegistersRepository: FakeRegistersRepository;
let showRegister: ShowRegisterService;

describe('CreateRegister', () => {
  beforeEach(() => {
    fakeRegistersRepository = new FakeRegistersRepository();
    showRegister = new ShowRegisterService(fakeRegistersRepository);
  });

  it('Should be able to show the registers', async () => {
    const fakeDate = new Date();

    const user = await fakeRegistersRepository.create({
      manager: 'manager',
      student: 'student',
      phone: 1234567890,
      responsible: 'responsible',
      startDate: fakeDate,
      schedule: 'schedule',
    });

    const register = await showRegister.execute({
      register_id: user.id,
    });

    expect(register.manager).toBe('manager');
    expect(register.student).toBe('student');
    expect(register.phone).toBe(1234567890);
    expect(register.responsible).toBe('responsible');
    expect(register.startDate).toBe(fakeDate);
    expect(register.schedule).toBe('schedule');
  });

  it('Should be able to show the registers with non-existing-register', async () => {
    await expect(
      showRegister.execute({
        register_id: 'non-existing-register',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
