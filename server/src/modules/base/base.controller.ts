import { Controller, Get, Inject, Request, Response } from '@nestjs/common';
import { BaseService } from './base.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('基础服务')
@Controller()
export class BaseController {
  @Inject() private readonly baseService: BaseService;

  @Get("/check-code")
  @ApiResponse({
    status: 200,
    description: '获取验证码',
    type: String,
    schema: {
      type: 'string',
      format: 'binary',
      description: '返回的验证码图片数据'
    }
  })
  checkCode(@Request() req, @Response() res) {
    const captcha = this.baseService.checkCode();
    req.session.checkCode = captcha.text.toLocaleLowerCase();
    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(captcha.data);
  }
}
