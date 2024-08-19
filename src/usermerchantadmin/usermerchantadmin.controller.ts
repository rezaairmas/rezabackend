import { Controller, Get, Query, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import { UserMerchantAdminService } from './usermerchantadmin.service';
import { CreateUserMerchantAdminDto } from './dto/create-usermerchantadmin.dto';
import { UpdateUserMerchantAdminDto } from './dto/update-usermerchantadmindto';
import { QueryUserMerchantAdminDto } from './dto/query-usermerchantadmindto';
import { PrismaService } from '@prisma/prisma.service';

@Controller('usermerchantadmin')
export class UserMerchantAdminController {
  constructor(
    private readonly usersService: UserMerchantAdminService,
    private readonly prismaService: PrismaService,
  ) {}

  @Get()
  async getUsers(@Query() _query: QueryUserMerchantAdminDto) {
    return this.usersService.getUsers(_query);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(+id);
  }

  @Post('add')
  async create(@Body() _create: CreateUserMerchantAdminDto) {
    return this.usersService.create(_create);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() _update: UpdateUserMerchantAdminDto) {
    return this.usersService.update(+id, _update);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.usersService.delete(+id);
  }
}
