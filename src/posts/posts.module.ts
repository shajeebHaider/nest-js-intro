import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostServices } from './providers/posts.service';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './posts.entity';
import { MetaOptions } from 'src/meta-options/meta-options.entity';
import { TagsModule } from 'src/tags/tags.module';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import { CreatePostProvider } from './providers/create-post.provider';

@Module({
  controllers: [PostsController],
  providers: [PostServices, CreatePostProvider],
  imports: [
    UsersModule,
    TagsModule,
    TypeOrmModule.forFeature([Post, MetaOptions]),
    PaginationModule,
  ],
})
export class PostsModule {}
