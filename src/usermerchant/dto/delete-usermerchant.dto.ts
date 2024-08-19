import { IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class DeleteUserMerchantDto {
  @IsInt()
  @Type(() => Number)
  id: number;
}
