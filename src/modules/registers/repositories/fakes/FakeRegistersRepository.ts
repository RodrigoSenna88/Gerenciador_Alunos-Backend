import { uuid } from 'uuidv4';

import IRegisterRepository from '@modules/registers/repositories/IRegistersRepository';
import ICreateRegisterDTO from '@modules/registers/dtos/ICreateRegisterDTO';

import Register from '../../infra/typeorm/entities/Register';

class FakeRegistersRepository implements IRegisterRepository {
  private registers: Register[] = [];

  public async findAllRegisters(): Promise<Register[]> {
    const findAllRegister = this.registers;

    return findAllRegister;
  }

  public async findRegisterBySchedule(schedule: string): Promise<Register[]> {
    const findRegister = this.registers.filter(
      (register) => register.schedule === schedule,
    );

    return findRegister;
  }

  public async findByRegisterId(id: string): Promise<Register | undefined> {
    const findRegister = this.registers.find((register) => register.id === id);
    return findRegister;
  }

  // verificação de estudante

  public async findByStudent(student: string): Promise<Register | undefined> {
    const findRegister = this.registers.find(
      (register) => register.student === student,
    );
    return findRegister;
  }

  public async create({
    manager,
    student,
    phone,
    responsible,
    startDate,
    schedule,
  }: ICreateRegisterDTO): Promise<Register> {
    const register = new Register();

    Object.assign(register, {
      id: uuid(),
      manager,
      student,
      phone,
      responsible,
      startDate,
      schedule,
    });

    this.registers.push(register);

    return register;
  }
}

export default FakeRegistersRepository;
