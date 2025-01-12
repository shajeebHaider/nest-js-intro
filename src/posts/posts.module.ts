import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostServices } from './providers/posts.service';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './posts.entity';
import { MetaOptions } from 'src/meta-options/meta-options.entity';
import { TagsModule } from 'src/tags/tags.module';

@Module({
  controllers: [PostsController],
  providers: [PostServices],
  imports: [
    UsersModule,
    TagsModule,
    TypeOrmModule.forFeature([Post, MetaOptions]),
  ],
})
export class PostsModule {}
