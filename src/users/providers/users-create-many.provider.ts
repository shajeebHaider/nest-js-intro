import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users.entity';
import { Repository } from 'typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class UsersCreateManyProvider {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    private readonly dataSource: DataSource,
  ) {}

  public async createMany(createUsersDto: CreateUserDto[]) {
    let newUsers: User[] = [];
    //create a query runner
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();

    try {
      for (let user of createUsersDto) {
        let newUser = queryRunner.manager.create(User, user);
        let result = await queryRunner.manager.save(newUser);
        newUsers.push(result);
      }
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
