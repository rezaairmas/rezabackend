import { IsNumber } from 'class-validator';

export class DeleteRoleDto {
  @IsNumber()
  id: number;
}
