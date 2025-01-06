import { Controller, Get, Param } from '@nestjs/common';
import { PostServices } from './providers/posts.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(private readonly postsServices: PostServices) {}

  @Get('/:userId?')
  public getPosts(@Param('userId') userId: string) {
    return this.postsServices.findAll(userId);
  }
}
