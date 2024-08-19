import { Module, Inject } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConfig } from '@configs/jwt.config';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { UserOfficeModule } from '@user_office/useroffice.module';
import { UserCustomerModule } from '@user_customer/usercustomer.module';
import { UserMerchantModule } from '@user_merchant/usermerchant.module';
import { UserMerchantAdminModule } from '@user_merchantadmin/usermerchantadmin.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register(jwtConfig),
    UserOfficeModule,
    UserCustomerModule,
    UserMerchantModule,
    UserMerchantAdminModule
  ],
  providers: [
    AuthService,
    JwtStrategy,
    {
      provide: 'APP_MODE',
      useValue: process.env.APP_MODE || 'branch',
    },
  ],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
