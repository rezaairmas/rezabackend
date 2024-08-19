import { UserType } from './auth-type.enum';

export interface JwtPayload {
  id: string;
  name: string;
  email: string;
  type: UserType; 
}