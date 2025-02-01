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

    private readonly dataSource: DataSource,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    let existingUser = undefined;
    try {
      existingUser = await this.usersRepository.findOne({
        where: { email: createUserDto.email },
      });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at this time',
        {
          description: 'error connecting the database',
        },
      );
    }

    if (existingUser) {
      throw new BadGatewayException('Thse user already exist');
    }

    let newUser = this.usersRepository.create(createUserDto);

    try {
      newUser = await this.usersRepository.save(newUser);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request right now',
        {
          description: 'error connecting to the database',
        },
      );
    }

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
