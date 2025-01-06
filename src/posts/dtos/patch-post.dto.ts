import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsIn, IsInt } from 'class-validator';
import { CreatePostDto } from './create-post.dto';

export class PatchPostDto extends PartialType(CreatePostDto) {
  @ApiProperty({
    description: 'The Id of the post that need to be updated',
  })
  @IsInt()
  id: number;
}
