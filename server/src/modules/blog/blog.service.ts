import { Inject, Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { PrismaService } from '../prisma/prisma.service';
import { QueryBlogDto } from './dto/query-blog.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class BlogService {
  @Inject() private readonly prismaService: PrismaService;

  async create(dto: CreateBlogDto) {
    return await this.prismaService.blog.create({
      data: {
        title: dto.title,
        content: dto.content,
        editorType: dto.editorType,
        cover: dto.cover,
        tags: dto.tags,
        blogType: dto.blogType,
        originalAddress: dto.originalAddress,
        allowComment: dto.allowComment,
        user: {
          connect: { id: dto.userId }
        },
        category: {
          connect: { id: dto.categoryId }
        }
      }
    });
  }

  async findAll(dto: QueryBlogDto) {
    const { skip, take, title, categoryId, userId } = dto;

    const where: Prisma.BlogWhereInput = {
      title: title ? { contains: title } : undefined,
      categoryId: categoryId ? +categoryId : undefined
    };
    const total = await this.prismaService.blog.count({ where });
    const rows = await this.prismaService.blog.findMany({
      skip: +skip || 0,
      take: +take || 10,
      where,
      orderBy: { id: 'desc' },
    });
    return { rows, total };
  }

  async findOne(id: string) {
    return await this.prismaService.blog.findUnique({ where: { id } });
  }

  async update(id: number, dto: UpdateBlogDto) {
    return `This action updates a #${id} blog`;
  }

  async remove(id: number) {
    return `This action removes a #${id} blog`;
  }
}
