import {
  Injectable,
  Inject,
  forwardRef,
  RequestTimeoutException,
  BadGatewayException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { AuthService } from 'src/auth/providers/auth.service';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { ConfigType } from '@nestjs/config';
import profileConfig from '../config/profile.config';
import { status } from 'src/posts/enums/status.enum';
import { error } from 'console';
import { UsersCreateManyProvider } from './users-create-many.provider';
import { CreateManyUsersDto } from '../dtos/create-many-user.dto';
import { CreateUserProvider } from './create-user.provider';
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

    @Inject(profileConfig.KEY)
    private readonly profileConfiguration: ConfigType<typeof profileConfig>,

    private readonly userCreateManyProviders: UsersCreateManyProvider,

    private readonly createUserProvider: CreateUserProvider,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    return this.createUserProvider.createUser(createUserDto);
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
    throw new HttpException(
      {
        status: HttpStatus.MOVED_PERMANENTLY,
        error: 'the api endpoint does not exist',
      },
      HttpStatus.MOVED_PERMANENTLY,
      {
        description: 'Occured Because the api endpoint has permanently moved',
      },
    );
  }
  /**
   *
   * find all users by id
   */
  public async findOnebyId(id: number) {
    try {
      return await this.usersRepository.findOneBy({ id });
    } catch (error) {
      throw new RequestTimeoutException(
        'Undable to process your request at the moment',
        {
          description: 'Error Connecting to database',
        },
      );
    }
  }

  public async createMany(createManyUsersDto: CreateManyUsersDto) {
    return await this.userCreateManyProviders.createMany(createManyUsersDto);
  }
}
