import { IsOptional, IsString, IsEnum } from 'class-validator';
import { SortOrder } from '../enums/sort-order.enum';

export class QueryUserOfficeDto {
  @IsOptional()
  @IsString()
  filter?: string;

  @IsOptional()
  @IsString()
  field?: string;

  @IsOptional()
  start?: number;

  @IsOptional()
  limit?: number;
  @IsOptional()
  @IsString()
  sortField?: string;

  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder?: SortOrder;
}
