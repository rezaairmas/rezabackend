import { IsInt, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class ReadUserMerchantDto {
  @IsInt()
  @Type(() => Number)
  id: number;

  @IsString()
  email: string;

  @IsString()
  name: string;

  @IsString()
  created_at: Date;

  @IsString()
  updated_at: Date;
}
