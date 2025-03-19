import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { Body } from '@nestjs/common';
import { CreatePostDto } from '../dtos/create-post.dto';
import { UsersService } from 'src/users/providers/users.service';
import { TagsService } from 'src/tags/providers/tags.service';
import { Repository } from 'typeorm';
import { Post } from '../posts.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { RequestTimeoutException } from '@nestjs/common';

@Injectable()
export class CreatePostProvider {
  constructor(
    private readonly userService: UsersService,
    private readonly tagService: TagsService,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  public async createPost(
    @Body() createPostDto: CreatePostDto,
    user: ActiveUserData,
  ) {
    let author = undefined;
    let tags = undefined;
    try {
      author = await this.userService.findOnebyId(user.sub);
      tags = await this.tagService.findMultipleTags(createPostDto.tags);
    } catch (error) {
      throw new RequestTimeoutException();
    }
    if (createPostDto.tags.length !== tags.length) {
      throw new BadRequestException('Please check your tag ID');
    }

    let newPost = this.postRepository.create({
      ...createPostDto,
      author: author,
      tags: tags,
    });

    try {
      return await this.postRepository.save(newPost);
    } catch (error) {
      throw new ConflictException(error, {
        description: 'ensure post slug is unique',
      });
    }
  }
}
