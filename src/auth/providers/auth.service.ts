import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { SignInDto } from '../dtos/signin.dto';
import { Body } from '@nestjs/common';
import { SignInProviders } from './sign-in.providers';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,

    private readonly signInProvider: SignInProviders,
  ) {}

  public async signin(signInDto: SignInDto) {
    return await this.signInProvider.signIn(signInDto);
  }
  public isAuth() {
    return true;
  }
}
