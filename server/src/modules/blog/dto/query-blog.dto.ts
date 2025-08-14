
import { PartialType } from '@nestjs/swagger';
import { CreateBlogDto } from './create-blog.dto';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class QueryBlogDto extends PartialType(CreateBlogDto) {

  @IsNotEmpty()
  @IsNumberString()
  skip: number;

  @IsNotEmpty()
  @IsNumberString()
  take: number;

  @IsNotEmpty()
  @IsNumberString()
  id: number;

  title?: string;
  status?: number;
  categoryId?: number;
}