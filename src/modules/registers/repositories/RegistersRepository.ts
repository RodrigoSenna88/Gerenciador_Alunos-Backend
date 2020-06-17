import { EntityRepository, Repository } from 'typeorm';

import Register from '../infra/typeorm/entities/Register';

@EntityRepository(Register)
class RegistersRepository extends Repository<Register> {
  // verificação de estudante

  public async findByStudent(student: string): Promise<Register | null> {
    const findRegister = await this.findOne({
      where: { student },
    });

    return findRegister || null;
  }
}

export default RegistersRepository;
