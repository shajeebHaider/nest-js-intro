import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TagsService } from './providers/tags.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './tags.entity';

@Module({
  controllers: [TagsController],
  providers: [TagsService],
  exports: [TagsService],
  imports: [TypeOrmModule.forFeature([Tag])],
})
export class TagsModule {}
