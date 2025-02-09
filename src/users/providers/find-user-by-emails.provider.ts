import { Injectable } from '@nestjs/common';
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
    let result = await this.userRepository.findOne({ where: { email } });

    if (!result) {
      throw new Error('Email Not Found');
    } else {
      return result;
    }
  }
}
