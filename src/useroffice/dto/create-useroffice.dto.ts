import { IsString, IsEmail, IsOptional, IsInt, MinLength, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserOfficeDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @MinLength(1)
  name: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  branchId?: number;
}
