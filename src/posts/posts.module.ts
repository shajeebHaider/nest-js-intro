import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostServices } from './providers/posts.service';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './posts.entity';

@Module({
  controllers: [PostsController],
  providers: [PostServices],
  imports: [UsersModule, TypeOrmModule.forFeature([Post])],
})
export class PostsModule {}
