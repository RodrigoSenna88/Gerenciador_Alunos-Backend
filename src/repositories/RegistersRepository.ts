import { EntityRepository, Repository } from 'typeorm';

import Register from '../models/Register';


@EntityRepository(Register)
class RegistersRepository extends Repository<Register>{
 // verificação de estudante

 public async findByStudent(name: string): Promise<Register | null> {
  const findRegister = await this.findOne({
    where: { name },
  });

  return findRegister || null;
}

}

export default RegistersRepository;
