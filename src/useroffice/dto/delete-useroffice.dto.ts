import { IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class DeleteUserOfficeDto {
  @IsInt()
  @Type(() => Number)
  id: number;
}
