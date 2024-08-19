import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PermissionType } from '../enums/permission.enum';

export class CreatePermissionDto {
  @IsEnum(PermissionType)
  name: PermissionType;

  @IsOptional()
  @IsString()
  description?: string;
}
