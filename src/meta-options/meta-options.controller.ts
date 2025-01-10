import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { MetaOptionsService } from './providers/meta-options.service';
import { CreatePostMetaOptionsDto } from './dtos/create-post-metaoptions.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Meta Options')
@Controller('meta-options')
export class MetaOptionsController {
  constructor(private readonly metaOptionservice: MetaOptionsService) {}

  @Post()
  public createMetaOption(
    @Body() createPostMetaOptionsDto: CreatePostMetaOptionsDto,
  ) {
    return this.metaOptionservice.create(createPostMetaOptionsDto);
  }

  @Get(':id')
  public async getMetaOption(@Param('id') id: number) {
    const metaOptions = await this.metaOptionservice.findOne(Number(id));
    console.log(metaOptions);

    if (!metaOptions) {
      return { message: 'Metaoptions not Found' };
    }
  }
}
