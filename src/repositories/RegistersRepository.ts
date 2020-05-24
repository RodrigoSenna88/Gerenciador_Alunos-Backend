import Register from '../models/Register';

class RegistersRepository {
  private registers: Register[];

  constructor() {
    this.registers = [];
  }

  public create(name: string, phone: number, responsable: string, startDate: Date, schedule: string): Register {
    const register = new Register(name, phone,  responsable,  startDate,  schedule);

    this.registers.push(register);

    return register;
  }
}

export default RegistersRepository;
