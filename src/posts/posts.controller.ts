import { Controller } from '@nestjs/common';
import { PostServices } from './providers/posts.service';

@Controller('posts')
export class PostsController {
  constructor() {}
}
