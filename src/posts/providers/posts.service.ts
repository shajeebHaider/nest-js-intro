import { Injectable, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../posts.entity';
import { Repository, ReturningStatementNotSupportedError } from 'typeorm';
import { CreatePostDto } from '../dtos/create-post.dto';
import { MetaOptions } from 'src/meta-options/meta-options.entity';
import { create } from 'domain';
import { CreatePostMetaOptionsDto } from 'src/meta-options/dtos/create-post-metaoptions.dto';

@Injectable()
export class PostServices {
  constructor(
    //injecting user service
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,

    @InjectRepository(MetaOptions)
    public readonly metaOptionsRepository: Repository<MetaOptions>,
  ) {}
  public async findAll(userId: number) {
    let posts = await this.postRepository.find({
      relations: {
        metaOptions: true,
      },
    });
    return posts;
  }

  public async delete(id: number) {
    // let post = await this.postRepository.findOne({
    //   where: { id },
    //   relations: { metaOptions: true },
    // });

    // if (post.metaOptions) {
    //   await this.metaOptionsRepository.delete(post.metaOptions.id);
    // }

    //After Cascading
    await this.postRepository.delete(id);

    return { deleted: true, id };
  }

  public async createPost(@Body() createPostDto: CreatePostDto) {
    // let newMetaoption = createPostDto.metaOptions
    //   ? this.metaOptionsRepository.create(createPostDto.metaOptions)
    //   : null;
    // if we add cascade in the post entity, we can ignore this conditions and creation of the metaoption table
    // if (newMetaoption) {
    //   await this.metaOptionsRepository.save(newMetaoption);
    // }

    let newPost = this.postRepository.create(createPostDto);

    // if (newMetaoption) {
    //   newPost.metaOptions = newMetaoption;
    // }
    return await this.postRepository.save(newPost);
  }
}
