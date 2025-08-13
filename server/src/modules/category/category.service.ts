import { BadRequestException, ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '../prisma/prisma.service';

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
    return true;
  }

  async update(dto: UpdateCategoryDto) {
    return await this.prismaService.category.update({ data: dto, where: { id: dto.id } });
  }

  async findAll() {
    return await this.prismaService.category.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.category.findUnique({ where: { id } });
  }
}
