import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IS_URL,
  IsJSON,
  IsNotEmpty,
  IsString,
  IsUrl,
  maxLength,
  MinLength,
  MaxLength,
  IsOptional,
} from 'class-validator';

export class CreateTagDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({
    example: 'my url',
  })
  slug: string;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @ApiPropertyOptional()
  @IsJSON()
  @IsNotEmpty()
  schema?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  @MaxLength(1024)
  featureImage?: string;
}
