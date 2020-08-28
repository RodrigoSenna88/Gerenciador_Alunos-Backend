import { getRepository, Repository } from 'typeorm';

import IRegisterRepository from '@modules/registers/repositories/IRegistersRepository';

import Register from '@modules/registers/infra/typeorm/entities/Register';
import ICreateRegisterDTO from '@modules/registers/dtos/ICreateRegisterDTO';

class RegistersRepository implements IRegisterRepository {
  private ormRepository: Repository<Register>;

  constructor() {
    this.ormRepository = getRepository(Register);
  }

  public async findAllRegisters(): Promise<Register[]> {
    const register = await this.ormRepository.find();

    return register;
  }

  public async findRegisterBySchedule(schedule: string): Promise<Register[]> {
    const listRegisterBySchedule = await this.ormRepository.find({
      where: { schedule },
    });

    return listRegisterBySchedule;
  }

  public async findByRegisterId(id: string): Promise<Register | undefined> {
    const findRegister = await this.ormRepository.findOne({
      where: { id },
    });

    return findRegister;
  }

  // verificação de estudante

  public async findByStudent(student: string): Promise<Register | undefined> {
    const findRegister = await this.ormRepository.findOne({
      where: { student },
    });

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
    const register = this.ormRepository.create({
      manager,
      student,
      phone,
      responsible,
      startDate,
      schedule,
    });

    await this.ormRepository.save(register);

    return register;
  }
}

export default RegistersRepository;
