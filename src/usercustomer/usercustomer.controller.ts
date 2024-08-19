import { Controller, Get, Query, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import { UserCustomerService } from './usercustomer.service';
import { CreateUserCustomerDto } from './dto/create-usercustomer.dto';
import { UpdateUserCustomerDto } from './dto/update-usercustomer.dto';
import { QueryUserCustomerDto } from './dto/query-usercustomer.dto';
import { PrismaService } from '@prisma/prisma.service';

@Controller('usercustomer')
export class UserCustomerController {
  constructor(
    private readonly usersService: UserCustomerService,
    private readonly prismaService: PrismaService,
  ) {}

  @Get()
  async getUsers(@Query() _query: QueryUserCustomerDto) {
    return this.usersService.getUsers(_query);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(+id);
  }

  @Post('add')
  async create(@Body() _create: CreateUserCustomerDto) {
    return this.usersService.create(_create);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() _update: UpdateUserCustomerDto) {
    return this.usersService.update(+id, _update);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.usersService.delete(+id);
  }
}
