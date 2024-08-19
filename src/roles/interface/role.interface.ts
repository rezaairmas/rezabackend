import { RoleType } from '../enums/role.enum';

export interface IRole {
  id: number;
  name: RoleType;
  description?: string;
}
