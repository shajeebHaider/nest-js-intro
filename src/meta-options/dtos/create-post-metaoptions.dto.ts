import { IsJSON, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostMetaOptionsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsJSON()
  metaValue: string;
}
