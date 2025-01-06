import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { AuthService } from 'src/auth/providers/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}
  public findAll(
    getUsersParamDto: GetUsersParamDto,
    limit: number,
    page: Number,
  ) {
    const isAuth = this.authService.isAuth();
    console.log(isAuth);

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

  public findOnebyId(id: string) {
    return {
      firstName: 'jhon',
      email: ' habijabi@email.com',
      id: 2,
    };
  }
}
