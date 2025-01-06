import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class PostServices {
  constructor(
    //injecting user service
    private readonly usersService: UsersService,
  ) {}
  public findAll(userId: string) {
    const user = this.usersService.findOnebyId(userId);
    // users service
    return [
      {
        user: user,
        title: 'asdfasdf',
        content: 'habijabi',
      },
      {
        user: user,
        title: 'ye',
        content: 'zoalala',
      },
    ];
  }
}
