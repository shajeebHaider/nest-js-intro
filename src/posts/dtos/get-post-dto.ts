import { IntersectionType } from '@nestjs/swagger';
import { IsDate, IsOptional } from 'class-validator';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query-dto';

class GetPostDtoBase {
  @IsOptional()
  @IsDate()
  startDate?: Date;

  @IsOptional()
  @IsDate()
  endDate?: Date;
}

export class GetPostDto extends IntersectionType(
  GetPostDtoBase,
  PaginationQueryDto,
) {}
