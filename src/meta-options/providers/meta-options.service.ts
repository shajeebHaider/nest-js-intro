import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { MetaOptions } from '../meta-options.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostMetaOptionsDto } from '../dtos/create-post-metaoptions.dto';

@Injectable()
export class MetaOptionsService {
  constructor(
    @InjectRepository(MetaOptions)
    private readonly metaOptionsRepository: Repository<MetaOptions>,
  ) {}

  public async create(createPostMetaOptionsDto: CreatePostMetaOptionsDto) {
    let newMetaoption = this.metaOptionsRepository.create(
      createPostMetaOptionsDto,
    );
    newMetaoption = await this.metaOptionsRepository.save(newMetaoption);
  }
}
