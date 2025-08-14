import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

import * as jwt from "jsonwebtoken";

@Injectable()
export class UserService {
  @Inject() private readonly prismaService: PrismaService;

  async login(account: string, password: string) {
    const user = await this.prismaService.user.findFirst({ where: { account } });

    if (!user) {
      throw new BadRequestException("用户不存在");
    }

    if (user.password !== password) {
      throw new BadRequestException("密码错误");
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined in the environment variables");
    }
    const token = jwt.sign({ id: user.id, account: user.account }, secret, { expiresIn: "3d" });

    return {
      token,
      admin: {
        id: user.id,
        account: user.account,
        name: user.name
      }
    };
  }
}
