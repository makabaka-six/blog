import { BlogType, EditorType } from "@prisma/client";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateBlogDto {
  @IsNotEmpty()
  @IsString()
  title: string;
  content: string;

  @IsNotEmpty()
  categoryId: number;

  @IsNotEmpty()
  cover: string;

  @IsNotEmpty()
  editorType: EditorType;

  @IsNotEmpty()
  blogType: BlogType;

  originalAddress: string;

  @IsNotEmpty()
  allowComment: boolean;

  @IsNotEmpty()
  userId: number;

  abstract: string;
  tags: string[];
}
