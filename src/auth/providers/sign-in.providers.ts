import {
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto } from '../dtos/signin.dto';
import { UsersService } from 'src/users/providers/users.service';
import { HashingProvider } from './hashing.provider';

import { ConfigType } from '@nestjs/config';

import { ActiveUserData } from '../interfaces/active-user-data.interface';
import { GenerateTokenProvider } from './generate-token.provider';

@Injectable()
export class SignInProviders {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,

    private readonly hashingProvider: HashingProvider,

    private readonly generateTokensProvider: GenerateTokenProvider,
  ) {}

  public async signIn(signInDto: SignInDto) {
    let user = await this.userService.findUserByEmail(signInDto.email);
    let isEqual: Boolean = false;

    try {
      isEqual = await this.hashingProvider.comparePassword(
        signInDto.password,
        user.password,
      );
    } catch (error) {
      throw new RequestTimeoutException('Could not compare password');
    }

    if (!isEqual) {
      throw new UnauthorizedException('Invalid email or password');
    }
    return await this.generateTokensProvider.generateToken(user);
  }
}
