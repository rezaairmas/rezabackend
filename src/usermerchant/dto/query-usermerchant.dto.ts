import { IsOptional, IsString, IsEnum, IsInt, IsPositive } from 'class-validator';
import { SortOrder } from '../enums/sort-order.enum';

export class QueryUserMerchantDto {
  @IsOptional()
  @IsString()
  filter?: string;

  @IsOptional()
  @IsString()
  field?: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  start?: number = 0;

  @IsOptional()
  @IsInt()
  @IsPositive()
  limit?: number = 10;

  @IsOptional()
  @IsString()
  sortField?: string = 'created_at';

  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder?: SortOrder = SortOrder.ASC;
}
