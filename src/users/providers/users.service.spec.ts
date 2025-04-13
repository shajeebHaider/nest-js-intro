import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { CreateGoogleUserProvider } from './create-google-user.provider';
import { FindOneByGoogleIdProvider } from './find-one-by-google-id.provider';
import { FindUserByEmailsProvider } from './find-user-by-emails.provider';
import { CreateUserProvider } from './create-user.provider';
import { UsersCreateManyProvider } from './users-create-many.provider';
import { DataSource } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../users.entity';
import { CreateUserDto } from '../dtos/create-user.dto';

describe('UsersService', () => {
  const mockCreateUserProvider: Partial<CreateUserProvider> = {
    createUser: (createUserDto: CreateUserDto) =>
      Promise.resolve({
        id: 12,
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        email: createUserDto.email,
        password: createUserDto.password,
      }),
  };

  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: CreateUserProvider, useValue: mockCreateUserProvider },
        { provide: DataSource, useValue: {} },
        { provide: getRepositoryToken(User), useValue: {} },
        { provide: CreateGoogleUserProvider, useValue: {} },
        { provide: FindOneByGoogleIdProvider, useValue: {} },
        { provide: FindUserByEmailsProvider, useValue: {} },

        { provide: UsersCreateManyProvider, useValue: {} },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('Should be Defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('should be defined', () => {
      expect(service.createUser).toBeDefined();
    });
    it('should call create user on CreateUserProvider', async () => {
      let user = await service.createUser({
        firstName: 'nura',
        lastName: 'ubaaa',
        email: 'asdf@gm.com',
        password: 'asdfasdfdf',
      });
      expect(user.firstName).toEqual('nura');
    });
  });
});
