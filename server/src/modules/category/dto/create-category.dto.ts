import { IsNotEmpty } from "class-validator";

export class CreateCategoryDto {
  @IsNotEmpty()
  name: string;

  icon?: string;

  desc?: string;
}
