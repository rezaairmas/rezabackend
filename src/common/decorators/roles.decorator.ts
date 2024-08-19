import { SetMetadata } from '@nestjs/common';
import { RoleType } from '../../roles/enums/role.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RoleType[]) => SetMetadata(ROLES_KEY, roles);
