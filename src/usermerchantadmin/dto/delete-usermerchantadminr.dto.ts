import { IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class DeleteUserMerchantAdminDto {
  @IsInt()
  @Type(() => Number)
  id: number;
}
