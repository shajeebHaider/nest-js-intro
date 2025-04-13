import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { Repository } from 'typeorm';
import { User } from '../users.entity';

import { RequestTimeoutException, BadRequestException } from '@nestjs/common';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { InjectRepository } from '@nestjs/typeorm';

import { MailService } from 'src/mail/providers/mail.service';

@Injectable()
export class CreateUserProvider {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,
    private readonly mailService: MailService,
  ) {}
  public async createUser(createUserDto: CreateUserDto) {
    let existingUser = undefined;
    try {
      existingUser = await this.usersRepository.findOne({
        where: { email: createUserDto.email },
      });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at this time',
        {
          description: 'error connecting the database',
        },
      );
    }

    if (existingUser) {
      throw new BadRequestException('Thse user already exist');
    }

    let newUser = this.usersRepository.create({
      ...createUserDto,
      password: await this.hashingProvider.hashPassword(createUserDto.password),
    });

    try {
      newUser = await this.usersRepository.save(newUser);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request right now',
        {
          description: 'error connecting to the database',
        },
      );
    }
    try {
      await this.mailService.sendUserWelcome(newUser);
    } catch (error) {
      console.error('Failed to send welcome email', error);
    }
    return newUser;
  }
}
