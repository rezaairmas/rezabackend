import { Module } from '@nestjs/common';
import { PermissionService } from './permissions.service';
import { PermissionController } from './permissions.controller';
import { PrismaService } from '@prisma/prisma.service';

@Module({
  providers: [PermissionService, PrismaService],
  controllers: [PermissionController],
})
export class PermissionModule {}
