import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreateUserMerchantDto } from './dto/create-usermerchant.dto';
import { UpdateUserMerchantDto } from './dto/update-usermerchant.dto';
import { QueryUserMerchantDto } from './dto/query-usermerchant.dto';
import { SortOrder } from './enums/sort-order.enum';
import * as bcrypt from 'bcrypt';
import { transformData } from '@utils/transform.utils';

@Injectable()
export class UserMerchantService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUsers(query: QueryUserMerchantDto) {
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

    const users = await this.prismaService.userMerchant.findMany({
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

  async create(createUserDto: CreateUserMerchantDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = await this.prismaService.userMerchant.create({ 
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
    const user = await this.prismaService.userMerchant.findUnique({
      where: { email },
    });

    return user ? transformData(user) : null;
  }

  async getUserById(id: number) {
    const user = await this.prismaService.userMerchant.findUnique({ 
      where: { id },
    });

    return user ? transformData(user) : null;
  }

  async update(id: number, update: UpdateUserMerchantDto) {
    const data: any = { ...update, updatedAt: new Date() };

    if (update.password) {
      data.password = await bcrypt.hash(update.password, 10);
    }

    const user = await this.prismaService.userMerchant.update({ 
      where: { id },
      data,
    });

    return transformData(user);
  }

  async delete(id: number) {
    await this.prismaService.userMerchant.delete({
      where: { id },
    });
    return { message: 'User deleted successfully' };
  }
}
