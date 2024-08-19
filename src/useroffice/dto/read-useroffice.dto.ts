import { IsInt, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class ReadUserOfficeDto {
  @IsInt()
  @Type(() => Number)
  id: number;

  @IsString()
  email: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  branchId?: number;

  @IsString()
  created_at: Date;

  @IsString()
  updated_at: Date;
}
