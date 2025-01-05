import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostServices } from './providers/posts.service';

@Module({
  controllers: [PostsController],
  providers: [PostServices],
})
export class PostsModule {}
