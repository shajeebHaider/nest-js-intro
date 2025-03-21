import {
  IsArray,
  IsInt,
  IsDate,
  IsEnum,
  IsISO8601,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { postType } from '../enums/postType.enum';
import { status } from '../enums/status.enum';
import { CreatePostMetaOptionsDto } from '../../meta-options/dtos/create-post-metaoptions.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(90)
  @ApiProperty({
    example: 'This is title',
    description: 'This is the title for Post',
  })
  title: string;

  @ApiProperty({
    enum: postType,
    description: "Possible Values: 'post', 'page', 'story', 'series'",
  })
  @IsNotEmpty()
  @IsEnum(postType)
  postType: postType;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({
    example: 'my url',
  })
  slug: string;

  @IsEnum(status)
  @IsNotEmpty()
  @ApiProperty({
    enum: status,
    description:
      "Possible status are: 'draft', 'scheduled', 'review', 'published'",
  })
  status: status;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'this is the content of the post',
  })
  content?: string;

  @ApiPropertyOptional({
    description:
      'Serialize your JSON object else a validation error will be thrown',
  })
  @IsOptional()
  @IsJSON()
  schema: string;

  @IsString()
  @IsOptional()
  @IsUrl()
  @ApiPropertyOptional({
    description: 'Feature Image for your post',
  })
  featuredImageUrl?: string;

  @IsISO8601()
  @IsOptional()
  publishOn?: Date;

  @ApiPropertyOptional({
    description: 'Array of Tags is passed',
    example: [1, 2],
  })
  @IsOptional()
  @IsArray()
  tags?: number[];

  @ApiPropertyOptional({
    type: 'object',
    required: false,
    items: {
      type: 'object',
      properties: {
        metaValue: {
          type: 'json',
          description: 'The Meta value is a JSON',
          example: '{"sidebarEnabled: true"}',
        },
      },
    },
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreatePostMetaOptionsDto)
  metaOptions?: CreatePostMetaOptionsDto | null;
}
