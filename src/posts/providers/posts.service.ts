import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../posts.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from '../dtos/create-post.dto';

@Injectable()
export class PostServices {
  constructor(
    //injecting user service
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}
  // public findAll(userId: string) {

  //   // users service
  //   return [
  //     {
  //       user: user,
  //       title: 'asdfasdf',
  //       content: 'habijabi',
  //     },
  //     {
  //       user: user,
  //       title: 'ye',
  //       content: 'zoalala',
  //     },
  //   ];
  // }

  public async createPost(createPostDto: CreatePostDto) {
    let newPost = this.postRepository.create(createPostDto);
    newPost = await this.postRepository.save(newPost);
  }
}
