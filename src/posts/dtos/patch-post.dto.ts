import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsArray, IsIn, IsInt, IsNotEmpty } from 'class-validator';
import { CreatePostDto } from './create-post.dto';

export class PatchPostDto extends PartialType(CreatePostDto) {
  @IsInt()
  @IsNotEmpty()
  @IsArray()
  id: number;
}
