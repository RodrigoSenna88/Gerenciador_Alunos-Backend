import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IRegistersRepository from '@modules/registers/repositories/IRegistersRepository';
import RegistersRepository from '@modules/registers/infra/typeorm/repositories/RegistersRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

container.registerSingleton<IRegistersRepository>(
  'RegistersRepository',
  RegistersRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);
