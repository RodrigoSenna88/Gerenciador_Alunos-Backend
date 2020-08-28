import Register from '@modules/registers/infra/typeorm/entities/Register';
import ICreateRegisterDTO from '@modules/registers/dtos/ICreateRegisterDTO';

export default interface IRegistersRepository {
  create(data: ICreateRegisterDTO): Promise<Register>;
  findByStudent(student: string): Promise<Register | undefined>;
  findAllRegisters(): Promise<Register[]>;
  findRegisterBySchedule(schedule: string): Promise<Register[]>;
  findByRegisterId(id: string): Promise<Register | undefined>;
}
