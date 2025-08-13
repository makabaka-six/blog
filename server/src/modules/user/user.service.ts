import { BadRequestException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  @Inject() private readonly prismaService: PrismaService;

  async login(account: string, password: string) {
    const admin = await this.prismaService.admin.findFirst({ where: { account } });

    if (!admin) {
      throw new BadRequestException('用户不存在');
    }

    if (admin.password !== password) {
      throw new BadRequestException('密码错误');
    }


    const token = jwt.sign({ id: admin.id, account: admin.account }, process.env.JWT_SECRET, { expiresIn: '3d' });

    return {
      token,
      admin: {
        id: admin.id,
        account: admin.account,
        name: admin.name,
      }
    };
  }
}
