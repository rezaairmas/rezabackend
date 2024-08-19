import { IsEmail, IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { UserType } from '../interfaces/auth-type.enum';

export class ForgotPasswordBranchDto {
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;
}

export class ForgotPasswordMarketplaceDto {
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsEnum(UserType, { message: 'Invalid user type' })
  @IsNotEmpty({ message: 'User type is required' })
  userType: UserType;
}
