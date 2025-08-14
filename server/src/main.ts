import { NestFactory } from '@nestjs/core';
import { RootModule } from './modules/root.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';

import ResponseInterceptor from '@/common/response.interceptor';
import AllExceptionFilter from './common/exception.filter';
import { NestExpressApplication } from '@nestjs/platform-express';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(RootModule);

  app.setGlobalPrefix('api');
  // app.enableCors({
  //   origin: process.env.CORS_ORIGIN || '*', // 允许的跨域源
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //   credentials: true, // 允许携带cookie
  //   allowedHeaders: 'Content-Type, Authorization',
  // });
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new AllExceptionFilter());
  app.useStaticAssets('uploads', {
    prefix: '/api/uploads/',
  });

  //配置cookie解析器
  app.use(cookieParser());

  //配置session
  app.use(session({
    secret: process.env.SESSION_SECRET || 'default_secret',
    resave: false,
    saveUninitialized: false,
  }));

  //配置Swagger
  const config = new DocumentBuilder()
    .setTitle("API Documentation")
    .setDescription("API documentation for the application")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/api-doc', app, document, {
    customCssUrl: 'https://unpkg.com/swagger-ui-themes@3.0.0/themes/3.x/theme-material.css',
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
