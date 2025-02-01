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

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(private readonly postsServices: PostServices) {}

  @Get('/:userId?')
  public getPosts(@Param('userId') userId: number) {
    return this.postsServices.findAll(userId);
  }

  @ApiOperation({
    summary: 'Creates a new blog Post',
  })
  @ApiResponse({
    status: 201,
    description: 'You created a 201 response successfully',
  })
  @Post()
  public createPost(@Body() createPostDto: CreatePostDto) {
    return this.postsServices.createPost(createPostDto);
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
