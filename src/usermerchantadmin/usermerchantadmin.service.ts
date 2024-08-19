import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreateUserMerchantAdminDto } from './dto/create-usermerchantadmin.dto';
import { UpdateUserMerchantAdminDto } from './dto/update-usermerchantadmindto';
import { QueryUserMerchantAdminDto } from './dto/query-usermerchantadmindto';
import { SortOrder } from './enums/sort-order.enum';
import * as bcrypt from 'bcrypt';
import { transformData } from '@utils/transform.utils';

@Injectable()
export class UserMerchantAdminService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUsers(query: QueryUserMerchantAdminDto) {
    const {
      filter,
      field,
      start = 0,
      limit = 10,
      sortField = 'createdAt',
      sortOrder = SortOrder.ASC,
    } = query;

    const orderBy = {
      [sortField]: sortOrder === SortOrder.ASC ? 'asc' : 'desc',
    };

    const skip = Number(start);
    const take = Number(limit);

    const users = await this.prismaService.userMerchantAdmin.findMany({
      where: filter
        ? {
            [field]: {
              contains: filter,
            },
          }
        : {},
      skip,
      take,
      orderBy,
    });

    return transformData(users);
  }

  async create(createUserDto: CreateUserMerchantAdminDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = await this.prismaService.userMerchantAdmin.create({ 
      data: {
        ...createUserDto,
        password: hashedPassword,
        // createdAt: new Date(),
        // updatedAt: new Date(),
      },
    });

    return transformData(user);
  }

  async findOne(email: string) {
    const user = await this.prismaService.userMerchantAdmin.findUnique({
      where: { email },
    });

    return user ? transformData(user) : null;
  }

  async getUserById(id: number) {
    const user = await this.prismaService.userMerchantAdmin.findUnique({ 
      where: { id },
    });

    return user ? transformData(user) : null;
  }

  async update(id: number, update: UpdateUserMerchantAdminDto) {
    const data: any = { ...update, updatedAt: new Date() };

    if (update.password) {
      data.password = await bcrypt.hash(update.password, 10);
    }

    const user = await this.prismaService.userMerchantAdmin.update({ 
      where: { id },
      data,
    });

    return transformData(user);
  }

  async delete(id: number) {
    await this.prismaService.userMerchantAdmin.delete({
      where: { id },
    });
    return { message: 'User deleted successfully' };
  }
}
