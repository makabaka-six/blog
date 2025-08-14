import { PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class QueryCategoryDto extends PartialType(CreateCategoryDto) {
  @IsNotEmpty()
  @IsNumberString()
  id: number;

  @IsNotEmpty()
  @IsNumberString()
  skip: number;

  @IsNotEmpty()
  @IsNumberString()
  take: number;
}
