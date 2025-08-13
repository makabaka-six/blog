import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { BaseModule } from './base/base.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [PrismaModule, BaseModule, UserModule, CategoryModule, UploadModule],
})
export class RootModule {}
