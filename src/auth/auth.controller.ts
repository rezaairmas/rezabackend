import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginBranchDto, LoginMarketplaceDto } from './dto/login.dto';
import { RegisterBranchDto, RegisterMarketplaceDto } from './dto/register.dto';
import { ForgotPasswordBranchDto, ForgotPasswordMarketplaceDto } from './dto/forgot.dto';
import { SkipAuth } from '@common/decorators/skip-auth.decorator';
import { SkipThrottler } from '@common/decorators/skip-throttler.decorator';
import { ConfigService } from '@nestjs/config';
import { UserType } from './interfaces/auth-type.enum';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) { }

  @Post('register')
  @SkipAuth()
  @SkipThrottler()
  async register(
    @Body() body: any,
  ) {
    const appMode = this.configService.get<string>('APP_MODE');
    let registerDto: RegisterBranchDto | RegisterMarketplaceDto;

    if (appMode === 'branch') {
      registerDto = plainToInstance(RegisterBranchDto, body);
      const errors = await validate(registerDto);
      if (errors.length > 0) {
        throw new BadRequestException('Invalid DTO for branch mode');
      }
      return this.authService.register(registerDto as RegisterBranchDto, UserType.OFFICE);
    } else if (appMode === 'marketplace') {
      registerDto = plainToInstance(RegisterMarketplaceDto, body);
      const errors = await validate(registerDto);
      if (errors.length > 0) {
        throw new BadRequestException('Invalid DTO for marketplace mode');
      }
      return this.authService.register(registerDto as RegisterMarketplaceDto, (registerDto as RegisterMarketplaceDto).userType);
    } else {
      throw new BadRequestException('Invalid application mode');
    }
  }

  @Post('login')
  @SkipAuth()
  @SkipThrottler()
  async login(
    @Body() body: any,
  ) {
    const appMode = this.configService.get<string>('APP_MODE');

    if (appMode === 'branch') {
      const loginDto = plainToInstance(LoginBranchDto, body);
      const errors = await validate(loginDto);
      if (errors.length > 0) {
        throw new BadRequestException('Invalid DTO for branch mode');
      }
      return this.authService.login(loginDto, UserType.OFFICE);
    } else if (appMode === 'marketplace') {
      const loginDto = plainToInstance(LoginMarketplaceDto, body);
      const errors = await validate(loginDto);
      if (errors.length > 0) {
        throw new BadRequestException('Invalid DTO for marketplace mode');
      }
      return this.authService.login(loginDto, loginDto.userType);
    } else {
      throw new BadRequestException('Invalid application mode');
    }
  }

  @Post('forgot')
  @SkipAuth()
  @SkipThrottler()
  async forgot(
    @Body() body: any,
  ) {
    const appMode = this.configService.get<string>('APP_MODE');

    if (appMode === 'branch') {
      const forgotDto = plainToInstance(ForgotPasswordBranchDto, body);
      const errors = await validate(forgotDto);
      if (errors.length > 0) {
        throw new BadRequestException('Invalid DTO for branch mode');
      }
      return this.authService.forgot(forgotDto, UserType.OFFICE);
    } else if (appMode === 'marketplace') {
      const forgotDto = plainToInstance(ForgotPasswordMarketplaceDto, body);
      const errors = await validate(forgotDto);
      if (errors.length > 0) {
        throw new BadRequestException('Invalid DTO for marketplace mode');
      }
      return this.authService.forgot(forgotDto, forgotDto.userType);
    } else {
      throw new BadRequestException('Invalid application mode');
    }
  }

}
