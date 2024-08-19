import { RoleType } from '../enums/role.enum';

export class ReadRoleDto {
  id: number;
  name: RoleType;
  description?: string;
}
