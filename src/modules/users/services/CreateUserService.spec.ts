import { compare } from 'bcryptjs';
import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakesUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('Should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'Jon Doe 13',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    //const passwordMatched = await compare('123456', user.password);

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('Jon Doe 13');
    expect(user.email).toBe('johndoe@gmail.com');
    expect(user.password).toBe('123456');
  });

  it('Should not be able to create a new user with the same email from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      name: 'Jon Doe 13',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    expect(
      createUser.execute({
        name: 'Jon Doe 13',
        email: 'johndoe@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});