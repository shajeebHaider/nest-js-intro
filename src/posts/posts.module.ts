import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostServices } from './providers/posts.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [PostsController],
  providers: [PostServices],
  imports: [UsersModule],
})
export class PostsModule {}
