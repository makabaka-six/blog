import { BadRequestException, ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '../prisma/prisma.service';
import { QueryCategoryDto } from './dto/query-category.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class CategoryService {
  @Inject() private readonly prismaService: PrismaService;


  async create(dto: CreateCategoryDto) {
    const existingCategory = await this.prismaService.category.findFirst({
      where: { name: dto.name },
    });
    if (existingCategory) {
      throw new ConflictException('分类已存在');
    }
    return await this.prismaService.category.create({ data: dto });
  }

  async remove(id: number) {
    await this.prismaService.category.delete({ where: { id } });
  }

  async update(dto: UpdateCategoryDto) {
    return await this.prismaService.category.update({ data: dto, where: { id: dto.id } });
  }

  async findAll(dto: QueryCategoryDto) {
    const { skip, take, id, name } = dto;
    const where: Prisma.CategoryWhereInput = {
      id: id ? +id : undefined,
      name: name ? { contains: name } : undefined,
    };

    const total = await this.prismaService.category.count({ where });
    const rows = await this.prismaService.category.findMany({
      skip: +skip || 0,
      take: +take || 10,
      where,
      orderBy: { id: 'desc' },
    });
    return { rows, total };
  }

  async findOne(id: number) {
    return await this.prismaService.category.findUnique({ where: { id } });
  }

  async findOptions() {
    const results = await this.prismaService.category.findMany({ select: { id: true, name: true } });
    return results.map(item => ({
      label: item.name,
      value: item.id,
    }));
  }
}
