import { Injectable, ConflictException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserOfficeService } from '@user_office/useroffice.service';
import { UserCustomerService } from '@user_customer/usercustomer.service';
import { UserMerchantService } from '@user_merchant/usermerchant.service';
import { UserMerchantAdminService } from '@user_merchantadmin/usermerchantadmin.service';
import { JwtPayload } from './interfaces/jwt-payload';
import * as bcrypt from 'bcrypt';
import { RegisterBranchDto, RegisterMarketplaceDto } from './dto/register.dto';
import { LoginBranchDto, LoginMarketplaceDto } from './dto/login.dto';
import { ForgotPasswordBranchDto, ForgotPasswordMarketplaceDto } from './dto/forgot.dto';
import { UserType } from './interfaces/auth-type.enum';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private userOfficeService: UserOfficeService,
    private userCustomerService: UserCustomerService,
    private userMerchantService: UserMerchantService,
    private userMerchantAdminService: UserMerchantAdminService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(registerDto: RegisterBranchDto | RegisterMarketplaceDto, userType: UserType) {
    const { email, password, name } = registerDto;
    const appMode = this.configService.get<string>('APP_MODE');

    // Check if the email already exists in the respective table
    let existingUser;
    switch (userType) {
      case UserType.OFFICE:
        existingUser = await this.userOfficeService.findOne(email);
        break;
      case UserType.MERCHANT:
        existingUser = await this.userMerchantService.findOne(email);
        break;
      case UserType.MERCHANT_ADMIN:
        existingUser = await this.userMerchantAdminService.findOne(email);
        break;
      case UserType.CUSTOMER:
        existingUser = await this.userCustomerService.findOne(email);
        break;
    }
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    // Create user in the appropriate table
    let user;
    if (appMode === 'branch') {
      user = await this.userOfficeService.create({
        name,
        email,
        password: password,
      });
    } else if (appMode === 'marketplace') {
      switch (userType) {
        case UserType.OFFICE:
          user = await this.userOfficeService.create({
            name,
            email,
            password: password,
          });
          break;
        case UserType.MERCHANT:
          user = await this.userMerchantService.create({
            name,
            email,
            password: password,
          });
          break;
        case UserType.MERCHANT_ADMIN:
          user = await this.userMerchantAdminService.create({
            name,
            email,
            password: password,
          });
          break;
        case UserType.CUSTOMER:
          user = await this.userCustomerService.create({
            name,
            email,
            password: password,
          });
          break;
      }
    }
    return user;
  }

  async validateUser(email: string, pass: string, userType: UserType): Promise<any> {
    const appMode = this.configService.get<string>('APP_MODE');
    let user;

    if (appMode === 'branch') {
      user = await this.userOfficeService.findOne(email);
    } else if (appMode === 'marketplace') {
      switch (userType) {
        case UserType.OFFICE:
          user = await this.userOfficeService.findOne(email);
          break;
        case UserType.MERCHANT:
          user = await this.userMerchantService.findOne(email);
          break;
        case UserType.MERCHANT_ADMIN:
          user = await this.userMerchantAdminService.findOne(email);
          break;
        case UserType.CUSTOMER:
          user = await this.userCustomerService.findOne(email);
          break;
      }
    }

    if (user) {
      const isPasswordMatching = await bcrypt.compare(pass, user.password);
      // console.log('Password:', pass);
      // console.log('Hashed password from DB:', user.password);
      // console.log('Password match:', isPasswordMatching);
      if (isPasswordMatching) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(
    loginDto: LoginBranchDto | LoginMarketplaceDto, 
    userType: UserType
  ) {
    const { email, password } = loginDto;
    const user = await this.validateUser(email, password, userType);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload: JwtPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
      type: userType,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      access_token: accessToken,
    };
  }

  async forgot(forgotDto: ForgotPasswordBranchDto | ForgotPasswordMarketplaceDto, userType: UserType) {
    const { email } = forgotDto;
    const appMode = this.configService.get<string>('APP_MODE');

    // Check if the email exists in the respective table
    let user;
    if (appMode === 'branch') {
      user = await this.userOfficeService.findOne(email);
    } else if (appMode === 'marketplace') {
      switch (userType) {
        case UserType.OFFICE:
          user = await this.userOfficeService.findOne(email);
          break;
        case UserType.MERCHANT:
          user = await this.userMerchantService.findOne(email);
          break;
        case UserType.MERCHANT_ADMIN:
          user = await this.userMerchantAdminService.findOne(email);
          break;
        case UserType.CUSTOMER:
          user = await this.userCustomerService.findOne(email);
          break;
      }
    }

    if (!user) {
      throw new NotFoundException('Email not found');
    }

    // Return password hash (not recommended for production)
    return {
      password: user.password, // This is just for debugging or example purposes
    };
  }
}
