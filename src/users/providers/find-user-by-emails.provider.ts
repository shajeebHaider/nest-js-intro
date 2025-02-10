import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../users.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FindUserByEmailsProvider {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async findUserByEmail(email: string): Promise<User> {
    try {
      let user = await this.userRepository.findOne({ where: { email } });

      if (!user) {
        throw new NotFoundException('Email not found', {
          description: 'The provided email does not exist in the system.',
        });
      }

      return user;
    } catch (error) {
      throw new NotFoundException('error from cathc block Not found', {
        description: 'There is an issue with the email',
      });
    }
  }
}
