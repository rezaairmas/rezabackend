import { IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class DeleteUserCustomerDto {
  @IsInt()
  @Type(() => Number)
  id: number;
}
