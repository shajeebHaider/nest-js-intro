import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { User } from 'src/users/users.entity';
import { ActiveUserData } from '../interfaces/active-user-data.interface';

@Injectable()
export class GenerateTokenProvider {
  constructor(
    private readonly jwtService: JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  public async signInToken<T>(userId: number, expiresIn: number, payload?: T) {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn,
      },
    );
  }

  public async generateToken(user: User) {
    //generate access token
    const [accessToken, refreshToken] = await Promise.all([
      this.signInToken<Partial<ActiveUserData>>(
        user.id,
        this.jwtConfiguration.accessToTokenTtl,
        {
          email: user.email,
        },
      ),
      //generate refresh token
      this.signInToken(user.id, this.jwtConfiguration.refreshToTokenTtl),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }
}
