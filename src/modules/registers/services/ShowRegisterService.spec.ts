// import AppError from '@shared/errors/AppError';

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

    const register = await showRegister.execute();

    expect(register).toBe(user);
  });
});
