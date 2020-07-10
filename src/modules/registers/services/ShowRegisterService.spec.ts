// import AppError from '@shared/errors/AppError';

import FakeRegistersRepository from '../repositories/fakes/FakeRegistersRepository';

import ShowRegisterService from './ShowRegisterService';
import Register from '../infra/typeorm/entities/Register';

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

    const userDois = await fakeRegistersRepository.create({
      manager: 'manager2',
      student: 'student2',
      phone: 1234567890,
      responsible: 'responsible2',
      startDate: fakeDate,
      schedule: 'schedule2',
    });

    const listRegister = await fakeRegistersRepository.findAllRegisters();

    console.log(listRegister);

    expect(listRegister).toEqual([user, userDois]);
    // expect(listRegister).toContain(userDois);
  });
});
