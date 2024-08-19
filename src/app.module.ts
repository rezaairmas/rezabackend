import { Module, Inject } from '@nestjs/common'; // Pastikan 'Inject' diimpor di sini
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserOfficeModule } from '@user_office/useroffice.module';
import { UserCustomerModule } from '@user_customer/usercustomer.module';
import { UserMerchantModule } from '@user_merchant/usermerchant.module';
import { UserMerchantAdminModule } from '@user_merchantadmin/usermerchantadmin.module';
import { RoleModule } from './roles/roles.module';
import { PermissionModule } from './permissions/permissions.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { ThrottlerGuard } from '@nestjs/throttler';
import { CustomThrottlerModule } from '@common/throttler/custom-throttler.module';
import { ChatModule } from './chat/chat.module';
import { NotificationsModule } from './notifications/notifications.module';
import { RolesGuard } from '@common/guards/roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // agar dapat diakses di seluruh aplikasi
    }),
    PrismaModule,
    AuthModule,
    UserOfficeModule,
    UserCustomerModule,
    UserMerchantModule,
    UserMerchantAdminModule,
    RoleModule,
    PermissionModule,
    CustomThrottlerModule.forRoot(), // Gunakan forRoot() untuk mengonfigurasi throttling
    ChatModule,
    NotificationsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: 'APP_MODE',
      useValue: process.env.APP_MODE || 'branch',
    },
  ],
})
export class AppModule {}
