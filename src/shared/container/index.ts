import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IRegistersRepository from '@modules/registers/repositories/IRegistersRepository';
import RegistersRepository from '@modules/registers/infra/typeorm/repositories/RegistersRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

container.registerSingleton<IRegistersRepository>(
  'RegistersRepository',
  RegistersRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
