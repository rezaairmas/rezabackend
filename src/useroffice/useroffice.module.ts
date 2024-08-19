import { Module } from '@nestjs/common';
import { UserOfficeController } from './useroffice.controller';
import { UserOfficeService } from './useroffice.service';
import { PrismaModule } from '@prisma/prisma.module';

@Module({
  imports     : [PrismaModule],
  controllers : [UserOfficeController],
  providers   : [UserOfficeService],
  exports     : [UserOfficeService],
})
export class UserOfficeModule {}
