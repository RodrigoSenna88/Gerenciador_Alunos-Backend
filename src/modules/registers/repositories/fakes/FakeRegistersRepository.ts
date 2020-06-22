import { uuid } from 'uuidv4';

import IRegisterRepository from '@modules/registers/repositories/IRegistersRepository';
import ICreateRegisterDTO from '@modules/registers/dtos/ICreateRegisterDTO';

import Register from '../../infra/typeorm/entities/Register';

class RegistersRepository implements IRegisterRepository {
  private registers: Register[] = [];

  // verificação de estudante

  public async findByStudent(student: string): Promise<Register | undefined> {
    const findRegister = this.registers.find(
      (register) => register.student === student,
    );
    return findRegister;
  }

  public async create({
    manager,
    phone,
    responsible,
    startDate,
    schedule,
  }: ICreateRegisterDTO): Promise<Register> {
    const register = new Register();

    Object.assign(register, {
      id: uuid(),
      manager,
      phone,
      responsible,
      startDate,
      schedule,
    });

    this.registers.push(register);

    return register;
  }
}

export default RegistersRepository;
