import { PermissionType } from '../enums/permission.enum';

export interface IPermission {
  id: number;
  name: PermissionType;
  description?: string;
}
