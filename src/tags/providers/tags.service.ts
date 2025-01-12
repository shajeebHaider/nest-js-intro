import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Tag } from '../tags.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTagDto } from '../dtos/create-tag.dto';
import { In } from 'typeorm';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  public async create(createTagDto: CreateTagDto) {
    let newTag = this.tagRepository.create(createTagDto);
    newTag = await this.tagRepository.save(newTag);
  }

  public async findMultipleTags(tags: number[]) {
    let result = await this.tagRepository.find({
      where: {
        id: In(tags),
      },
    });
    return result;
  }
  public async delete(id: number) {
    await this.tagRepository.delete(id);
    return {
      deleted: true,
      id,
    };
  }
}
