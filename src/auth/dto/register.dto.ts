import { IsEmail, IsNotEmpty, IsString, MinLength, IsEnum } from 'class-validator';
import { UserType } from '../interfaces/auth-type.enum';

export class RegisterBranchDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  @MinLength(3)
  name: string;

  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}

export class RegisterMarketplaceDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  @MinLength(3)
  name: string;

  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @IsEnum(UserType, { message: 'Invalid user type' })
  @IsNotEmpty({ message: 'User type is required' })
  userType: UserType;
}