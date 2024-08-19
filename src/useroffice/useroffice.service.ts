import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreateUserOfficeDto } from './dto/create-useroffice.dto';
import { UpdateUserOfficeDto } from './dto/update-useroffice.dto';
import { QueryUserOfficeDto } from './dto/query-usersoffice.dto';
import { SortOrder } from './enums/sort-order.enum';
import * as bcrypt from 'bcrypt';
import { transformData } from '@utils/transform.utils';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserOfficeService {
  private readonly defaultStart: number;
  private readonly defaultLimit: number;
  private readonly defaultSortField: string;
  private readonly defaultSortOrder: SortOrder;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService
  ) {
    // Mengambil nilai default dari variabel lingkungan
    this.defaultStart = parseInt(this.configService.get<string>('DEFAULT_START'), 10);
    this.defaultLimit = parseInt(this.configService.get<string>('DEFAULT_LIMIT'), 10);
    this.defaultSortField = this.configService.get<string>('DEFAULT_SORT_FIELD');
    this.defaultSortOrder = this.configService.get<SortOrder>('DEFAULT_SORT_ORDER') as SortOrder;
  }

  async getUsers(query: QueryUserOfficeDto) {
    const {
      filter = '',
      field = 'email',
      start = this.defaultStart,
      limit = this.defaultLimit,
      sortField = this.defaultSortField,
      sortOrder = this.defaultSortOrder,
    } = query;
  
    const orderBy = {
      [sortField]: sortOrder === SortOrder.ASC ? 'asc' : 'desc',
    };
  
    const skip = Number(start);
    const take = Number(limit);
  
    const whereCondition = filter
      ? {
          [field]: {
            contains: filter,
          },
        }
      : {};
  
    const users = await this.prismaService.userOffice.findMany({
      where: whereCondition,
      skip,
      take,
      orderBy,
    });
  
    return transformData(users);
  }   

  async create(createUserDto: CreateUserOfficeDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = await this.prismaService.userOffice.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });

    return transformData(user);
  }

  async findOne(email: string) {
    const user = await this.prismaService.userOffice.findUnique({
      where: { email },
    });

    return user ? transformData(user) : null;
  }

  async getUserById(id: number) {
    const user = await this.prismaService.userOffice.findUnique({
      where: { id },
    });

    return user ? transformData(user) : null;
  }

  async update(id: number, update: UpdateUserOfficeDto) {
    const data: any = { ...update, updated_at: new Date() };

    if (update.password) {
      data.password = await bcrypt.hash(update.password, 10);
    }

    const user = await this.prismaService.userOffice.update({
      where: { id },
      data,
    });

    return transformData(user);
  }

  async delete(id: number) {
    await this.prismaService.userOffice.delete({
      where: { id },
    });
    return { message: 'User deleted successfully' };
  }
}
