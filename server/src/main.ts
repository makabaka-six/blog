import { NestFactory } from '@nestjs/core';
import { RootModule } from './modules/root.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(RootModule);


  app.enableCors(true);


  configSwagger(app);

  await app.listen(process.env.PORT ?? 3000);
}


function configSwagger(app) {
  const config = new DocumentBuilder()
    .setTitle("API Documentation")
    .setDescription("API documentation for the application")
    .setVersion("1.0")
    .addTag("api")
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/api-doc', app, document, {
    customCssUrl: 'https://unpkg.com/swagger-ui-themes@3.0.0/themes/3.x/theme-material.css',
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
}

bootstrap();
