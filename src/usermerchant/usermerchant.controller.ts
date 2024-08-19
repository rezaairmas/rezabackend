import { Controller, Get, Query, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import { UserMerchantService } from './usermerchant.service';
import { CreateUserMerchantDto } from './dto/create-usermerchant.dto';
import { UpdateUserMerchantDto } from './dto/update-usermerchant.dto';
import { QueryUserMerchantDto } from './dto/query-usermerchant.dto';
import { PrismaService } from '@prisma/prisma.service';

@Controller('usermerchant')
export class UserMerchantController {
  constructor(
    private readonly usersService: UserMerchantService,
    private readonly prismaService: PrismaService,
  ) {}

  @Get()
  async getUsers(@Query() _query: QueryUserMerchantDto) {
    return this.usersService.getUsers(_query);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(+id);
  }

  @Post('add')
  async create(@Body() _create: CreateUserMerchantDto) {
    return this.usersService.create(_create);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() _update: UpdateUserMerchantDto) {
    return this.usersService.update(+id, _update);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.usersService.delete(+id);
  }
}
