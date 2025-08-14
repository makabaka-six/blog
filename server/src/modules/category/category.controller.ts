import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiTags } from '@nestjs/swagger';
import { QueryCategoryDto } from './dto/query-category.dto';

@ApiTags('分类管理')
@Controller('category')
export class CategoryController {
  @Inject() private readonly categoryService: CategoryService;

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }

  @Patch()
  update(@Body() dto: UpdateCategoryDto) {
    return this.categoryService.update(dto);
  }

  @Get()
  findAll(@Param() dto: QueryCategoryDto) {
    return this.categoryService.findAll(dto);
  }

  @Get("options")
  findOptions() {
    return this.categoryService.findOptions();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }
}
