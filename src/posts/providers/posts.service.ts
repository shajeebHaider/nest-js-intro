import { Injectable, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../posts.entity';
import { Repository, ReturningStatementNotSupportedError } from 'typeorm';
import { CreatePostDto } from '../dtos/create-post.dto';
import { MetaOptions } from 'src/meta-options/meta-options.entity';
import { create } from 'domain';
import { CreatePostMetaOptionsDto } from 'src/meta-options/dtos/create-post-metaoptions.dto';
import { UsersService } from 'src/users/providers/users.service';
import { User } from 'src/users/users.entity';
import { TagsService } from 'src/tags/providers/tags.service';
import { PatchPostDto } from '../dtos/patch-post.dto';

@Injectable()
export class PostServices {
  constructor(
    //injecting user service
    private readonly userService: UsersService,

    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,

    @InjectRepository(MetaOptions)
    public readonly metaOptionsRepository: Repository<MetaOptions>,

    private readonly tagService: TagsService,
  ) {}
  public async findAll(userId: number) {
    let posts = await this.postRepository.find({
      relations: {
        metaOptions: true,
        author: true,
        tags: true,
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
    let author = await this.userService.findOnebyId(createPostDto.authorId);
    let tags = await this.tagService.findMultipleTags(createPostDto.tags);
    let newPost = this.postRepository.create({
      ...createPostDto,
      author: author,
      tags: tags,
    });
    // if (newMetaoption) {
    //   newPost.metaOptions = newMetaoption;
    // }
    return await this.postRepository.save(newPost);
  }

  public async updatePost(@Body() patchPostDto: PatchPostDto) {
    let tags = await this.tagService.findMultipleTags(patchPostDto.tags);
    let post = await this.postRepository.findOneBy({
      id: patchPostDto.id,
    });
    post.title = patchPostDto.title ?? post.title;
    post.content = patchPostDto.content ?? post.content;
    post.status = patchPostDto.content ?? post.status;
    post.postType = patchPostDto.postType ?? post.postType;
    post.slug = patchPostDto.slug ?? post.slug;
    post.featuredImageUrl =
      patchPostDto.featuredImageUrl ?? post.featuredImageUrl;
    post.publishOn = patchPostDto.publishOn ?? post.publishOn;

    post.tags = tags;

    return await this.postRepository.save(post);
  }
}
