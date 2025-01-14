import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { AuthService } from 'src/auth/providers/auth.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
// import { ConfigService } from '@nestjs/config';
/**
 *
 * class to connect to users table
 */
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    // private readonly configService: ConfigService,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });

    let newUser = this.usersRepository.create(createUserDto);
    newUser = await this.usersRepository.save(newUser);

    return newUser;
  }
  /**
   *
   * find all users
   */
  public findAll(
    getUsersParamDto: GetUsersParamDto,
    limit: number,
    page: Number,
  ) {
    // const environment = this.configService.get<string>('S3_BUCKET');
    // console.log(environment);

    return [
      {
        firstName: 'jhon',
        email: ' habijabi@email.com',
        id: 233,
      },
      {
        firstName: 'mota',
        email: ' motu@email.com',
        id: 232,
      },
    ];
  }
  /**
   *
   * find all users by id
   */
  public async findOnebyId(id: number) {
    return await this.usersRepository.findOneBy({ id });
  }
}
