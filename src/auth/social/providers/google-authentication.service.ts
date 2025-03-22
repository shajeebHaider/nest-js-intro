import {
  forwardRef,
  Inject,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import jwtConfig from 'src/auth/config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { GoogleTokenDto } from '../dtos/google-token.dto';
import { UsersService } from 'src/users/providers/users.service';
import { GenerateTokenProvider } from 'src/auth/providers/generate-token.provider';

@Injectable()
export class GoogleAuthenticationService implements OnModuleInit {
  private oauthClient: OAuth2Client;
  constructor(
    //inject Jwt
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

    private readonly generateTokenProvider: GenerateTokenProvider,

    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  onModuleInit() {
    const clientId = this.jwtConfiguration.googleClientId;
    const clientSeret = this.jwtConfiguration.googleClientSecret;
    this.oauthClient = new OAuth2Client(clientId, clientSeret);
  }

  public async authenticate(googleTokenDto: GoogleTokenDto) {
    //verify g token
    try {
      const loginTicket = await this.oauthClient.verifyIdToken({
        idToken: googleTokenDto.token,
      });

      //extract the payload
      const {
        email,
        sub: googelId,
        given_name: firstName,
        family_name: lastName,
      } = loginTicket.getPayload();
      //find the user from database using the gogleId
      const user = await this.usersService.findOneByGoogleId(googelId);
      //if gid exist create generate token
      if (user) {
        return this.generateTokenProvider.generateToken(user);
      }

      //if not exist create a new user and then generate tokens
      const newUser = await this.usersService.createGoogleUser({
        email: email,
        firstName: firstName,
        lastName: lastName,
        googleId: googelId,
      });

      return this.generateTokenProvider.generateToken(newUser);
      //if failed thow unauthorized
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
