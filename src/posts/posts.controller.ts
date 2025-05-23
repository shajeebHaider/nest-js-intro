import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  ParseIntPipe,
  Delete,
  Query,
} from '@nestjs/common';
import { PostServices } from './providers/posts.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-post.dto';
import { GetPostDto } from './dtos/get-post-dto';
import { ActiveUser } from 'src/auth/decorator/active-user.decorator';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(private readonly postsServices: PostServices) {}

  @Get('/:userId?')
  public getPosts(
    @Param('userId') userId: string,
    @Query() postQuery: GetPostDto,
  ) {
    console.log(postQuery);
    return this.postsServices.findAll(postQuery, userId);
  }

  @ApiOperation({
    summary: 'Creates a new blog Post',
  })
  @ApiResponse({
    status: 201,
    description: 'You created a 201 response successfully',
  })
  @Post()
  public createPost(
    @Body() createPostDto: CreatePostDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    //return this.postsServices.createPost(createPostDto);
    console.log(user);
  }

  @ApiOperation({
    summary: 'Update a new blog post',
  })
  @ApiResponse({
    status: 201,
    description: 'Updated successfully',
  })
  @Patch(':id')
  public updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body() patchPostsDto: PatchPostDto,
  ) {
    this.postsServices.updatePost(id, patchPostsDto);
  }

  @Delete()
  public deletePost(@Query('id', ParseIntPipe) id: number) {
    this.postsServices.delete(id);
  }
}
