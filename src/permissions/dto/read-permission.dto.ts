import { PermissionType } from '../enums/permission.enum';

export class ReadPermissionDto {
  id: number;
  name: PermissionType;
  description?: string;
}
