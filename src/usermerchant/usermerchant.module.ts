import { Module } from '@nestjs/common';
import { UserMerchantController } from './usermerchant.controller';
import { UserMerchantService } from './usermerchant.service';
import { PrismaModule } from '@prisma/prisma.module';

@Module({
  imports     : [PrismaModule],
  controllers : [UserMerchantController],
  providers   : [UserMerchantService],
  exports     : [UserMerchantService],
})
export class UserMerchantModule {}
