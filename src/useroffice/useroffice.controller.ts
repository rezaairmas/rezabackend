import { Controller, Get, Query, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import { UserOfficeService } from './useroffice.service';
import { CreateUserOfficeDto } from './dto/create-useroffice.dto';
import { UpdateUserOfficeDto } from './dto/update-useroffice.dto';
import { QueryUserOfficeDto } from './dto/query-usersoffice.dto';
import { PrismaService } from '@prisma/prisma.service';

@Controller('useroffice')
export class UserOfficeController {
  constructor(
    private readonly usersService: UserOfficeService,
    private readonly prismaService: PrismaService,
  ) {}

  @Get()
  async getUsers(@Query() _query: QueryUserOfficeDto) {
    return this.usersService.getUsers(_query);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(+id);
  }

  @Post('add')
  async create(@Body() _create: CreateUserOfficeDto) {
    return this.usersService.create(_create);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() _update: UpdateUserOfficeDto) {
    return this.usersService.update(+id, _update);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.usersService.delete(+id);
  }
}
