import { BadRequestException, Body, Controller, Inject, Post, Req, Res } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserLoginDto } from "./dto/user.dto";
import { Response } from "express";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("用户管理")
@Controller("user")
export class UserController {
  @Inject() private readonly userService: UserService;

  @Post("login")
  async login(@Req() req, @Res({ passthrough: true }) res: Response, @Body() dto: UserLoginDto) {
    if (!req.session || req.session.checkCode !== dto.checkCode) {
      throw new BadRequestException("验证码错误");
    }

    const { token } = await this.userService.login(dto.account, dto.password);

    res.cookie("token", token);

    return;
  }
}
