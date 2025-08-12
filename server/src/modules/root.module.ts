import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { BaseModule } from './base/base.module';

@Module({
  imports: [PrismaModule, BaseModule],
})
export class RootModule {}
