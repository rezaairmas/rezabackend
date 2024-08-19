import { IsEmail, IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { UserType } from '../interfaces/auth-type.enum';

export class LoginBranchDto {
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString()
  password: string;
}

export class LoginMarketplaceDto {
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString()
  password: string;

  @IsEnum(UserType, { message: 'Invalid user type' })
  @IsNotEmpty({ message: 'User type is required' })
  userType: UserType;
}
