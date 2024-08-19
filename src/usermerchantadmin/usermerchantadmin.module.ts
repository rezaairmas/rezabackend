import { Module } from '@nestjs/common';
import { UserMerchantAdminController } from './usermerchantadmin.controller';
import { UserMerchantAdminService } from './usermerchantadmin.service';
import { PrismaModule } from '@prisma/prisma.module';

@Module({
  imports     : [PrismaModule],
  controllers : [UserMerchantAdminController],
  providers   : [UserMerchantAdminService],
  exports     : [UserMerchantAdminService],
})
export class UserMerchantAdminModule {}
