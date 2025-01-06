import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
  ) {}

  public login(email: string, password: string, id: string) {
    const users = this.userService.findOnebyId('1234');

    return 'SAMPLE_TOKEN';
  }
  public isAuth() {
    return true;
  }
}
