import {
  Injectable,
  Body,
  RequestTimeoutException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
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
import { error } from 'console';
import { threadId } from 'worker_threads';
import { skip } from 'rxjs';
import { GetPostDto } from '../dtos/get-post-dto';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';

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

    private readonly paginationProvider: PaginationProvider,
  ) {}

  public async findAll(
    postQuery: GetPostDto,
    userId: string,
  ): Promise<Paginated<Post>> {
    let posts = await this.paginationProvider.paginateQuery(
      {
        limit: postQuery.limit,
        page: postQuery.page,
      },
      this.postRepository,
    );
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
    try {
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
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at this moment',
        {
          description: 'There is an issue while connectiong the database',
        },
      );
    }
  }

  public async updatePost(id: number, @Body() patchPostDto: PatchPostDto) {
    let tags = undefined;
    let post = undefined;

    try {
      tags = await this.tagService.findMultipleTags(patchPostDto.tags);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at this time',
      );
    }

    if (!tags || tags.length !== patchPostDto.tags.length) {
      throw new BadRequestException(
        'Please check your tag ids and ensure they are correct',
      );
    }

    try {
      post = await this.postRepository.findOneBy({ id });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at this mote',
      );
    }

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    post.title = patchPostDto.title ?? post.title;
    post.content = patchPostDto.content ?? post.content;
    post.status = patchPostDto.content ?? post.status;
    post.postType = patchPostDto.postType ?? post.postType;
    post.slug = patchPostDto.slug ?? post.slug;
    post.featuredImageUrl =
      patchPostDto.featuredImageUrl ?? post.featuredImageUrl;
    post.publishOn = patchPostDto.publishOn ?? post.publishOn;

    post.tags = tags;
    try {
      await this.postRepository.save(post);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at this momment',
      );
    }

    return post;
  }
}
