import { Module } from '@nestjs/common';
import { RoleService } from './roles.service';
import { RoleController } from './roles.controller';
import { PrismaService } from '@prisma/prisma.service';

@Module({
  providers: [RoleService, PrismaService],
  controllers: [RoleController],
})
export class RoleModule {}
