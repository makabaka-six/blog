import { Injectable } from '@nestjs/common';

import * as svgCaptcha from 'svg-captcha';

@Injectable()
export class BaseService {
  checkCode() {
    const captcha = svgCaptcha.create({
      size: 4,
      ignoreChars: '0o1i',
      noise: 2,
      color: true,
      background: '#f0f0f0',
      width: 100,
      height: 40,
      fontSize: 50
    });

    return captcha;
  }
}
