import Register from '../models/Register';

interface CreateRegisterDTO {
  name: string;
   phone: number;
    responsable: string;
     startDate: Date;
      schedule: string;
}

class RegistersRepository {
  private registers: Register[];

  constructor() {
    this.registers = [];
  }

  public all(): Register[] {
    return this.registers;
  }

  public create({name, phone, responsable, startDate, schedule}:
     CreateRegisterDTO): Register {
    const register = new Register({
      name,
      phone,
      responsable,
      startDate,
      schedule
    });

    this.registers.push(register);

    return register;
  }
}

export default RegistersRepository;
