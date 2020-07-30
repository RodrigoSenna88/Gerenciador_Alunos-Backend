// import AppError from '@shared/errors/AppError';

import FakeRegistersRepository from '../repositories/fakes/FakeRegistersRepository';

let fakeRegistersRepository: FakeRegistersRepository;

describe('ShowRegisterBySchedule', () => {
  beforeEach(() => {
    fakeRegistersRepository = new FakeRegistersRepository();
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

    await fakeRegistersRepository.create({
      manager: 'manager2',
      student: 'student2',
      phone: 1234567890,
      responsible: 'responsible2',
      startDate: fakeDate,
      schedule: 'schedule2',
    });

    const userTres = await fakeRegistersRepository.create({
      manager: 'manager3',
      student: 'student3',
      phone: 1234567890,
      responsible: 'responsible3',
      startDate: fakeDate,
      schedule: 'schedule',
    });

    const listSchedule = await fakeRegistersRepository.findRegisterBySchedule(
      'schedule',
    );

    console.log(listSchedule);

    expect(listSchedule).toEqual([user, userTres]);
  });
});
