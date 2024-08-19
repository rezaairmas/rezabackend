import { Module } from '@nestjs/common';
import { UserCustomerController } from './usercustomer.controller';
import { UserCustomerService } from './usercustomer.service';
import { PrismaModule } from '@prisma/prisma.module';

@Module({
  imports     : [PrismaModule],
  controllers : [UserCustomerController],
  providers   : [UserCustomerService],
  exports     : [UserCustomerService],
})
export class UserCustomerModule {}
