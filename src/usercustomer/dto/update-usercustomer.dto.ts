import { IsOptional, IsString, IsInt, MinLength } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateUserCustomerDto {
  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  name?: string;
}
