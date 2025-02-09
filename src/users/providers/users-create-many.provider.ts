import {
  ConflictException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users.entity';
import { Repository } from 'typeorm';
import { DataSource } from 'typeorm';
import { CreateManyUsersDto } from '../dtos/create-many-user.dto';
import { stringify } from 'querystring';

@Injectable()
export class UsersCreateManyProvider {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    private readonly dataSource: DataSource,
  ) {}

  public async createMany(createManyUsersDto: CreateManyUsersDto) {
    let newUsers: User[] = [];
    //create a query runner
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      await queryRunner.connect();

      await queryRunner.startTransaction();
    } catch (error) {
      throw new RequestTimeoutException('could not process your request');
    }

    try {
      for (let user of createManyUsersDto.users) {
        let newUser = queryRunner.manager.create(User, user);
        let result = await queryRunner.manager.save(newUser);
        newUsers.push(result);
      }
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new ConflictException('There is an issue with the users data', {
        description: String(error),
      });
    } finally {
      await queryRunner.release();
    }
    return newUsers;
  }
}
