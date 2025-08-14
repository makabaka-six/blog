import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) { }

  @Post()
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads', // 图片存储的目录
      filename: (req, file, cb) => {
        console.log(file.fieldname);
        const randomName = crypto.randomUUID().replace(/-/g, ''); // 生成随机文件名
        cb(null, `${randomName}${extname(file.originalname)}`); // 生成随机文件名
      },
    }),
  }))
  uploadFile(@UploadedFile() file) {
    console.log(file);
    return {
      message: '图片上传成功',
      filename: file.filename,
      url: `/api/uploads/${file.filename}`
    };
  }
}
