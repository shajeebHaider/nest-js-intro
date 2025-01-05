import { Injectable } from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';

@Injectable()
export class UsersService {
  public findAll(
    getUsersParamDto: GetUsersParamDto,
    limit: number,
    page: Number,
  ) {
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

  public findOnebyId(id: number) {
    return {
      firstName: 'jhon',
      email: ' habijabi@email.com',
      id: 2,
    };
  }
}
