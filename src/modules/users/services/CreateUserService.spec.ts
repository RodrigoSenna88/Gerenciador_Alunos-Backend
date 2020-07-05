import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakesUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('Should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Jon Doe 13',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('Jon Doe 13');
    expect(user.email).toBe('johndoe@gmail.com');
    expect(user.password).toBe('123456');
  });

  it('Should not be able to create a new user with the same email from another', async () => {
    await createUser.execute({
      name: 'Jon Doe 13',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    await expect(
      createUser.execute({
        name: 'Jon Doe 13',
        email: 'johndoe@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
