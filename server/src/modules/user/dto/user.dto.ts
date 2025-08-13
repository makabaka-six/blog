import { IsNotEmpty, IsString } from "class-validator";

export class UserLoginDto {
  @IsString()
  @IsNotEmpty()
  account: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  checkCode: string;
}