import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import jwtConfig from '../config/jwt.config';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import { GenerateTokenProvider } from './generate-token.provider';
import { UsersService } from 'src/users/providers/users.service';
import { forwardRef } from '@nestjs/common';
import { ActiveUserData } from '../interfaces/active-user-data.interface';

@Injectable()
export class RefreshTokensProviderTs {
  constructor(
    private readonly jwtService: JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly generateTokensProvider: GenerateTokenProvider,

    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
  ) {}
  public async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    //verify the refresh token
    try {
      const { sub } = await this.jwtService.verifyAsync<
        Pick<ActiveUserData, 'sub'>
      >(refreshTokenDto.refreshToken, {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.secret,
        issuer: this.jwtConfiguration.issuer,
      });
      //fetch user from database
      const user = await this.userService.findOnebyId(sub);
      // generate token
      return await this.generateTokensProvider.generateToken(user);
    } catch (error) {
      throw UnauthorizedException;
    }
  }
}
