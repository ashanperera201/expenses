import { NestFactory } from '@nestjs/core';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './controllers/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const applicationConfig = app.get<ConfigService>(ConfigService)?.get('applicationConfig');
  const port = app.get<ConfigService>(ConfigService)?.get('port');

  const config = new DocumentBuilder().setTitle(applicationConfig.serverTitle).setDescription(applicationConfig.applicationServerDescription).setVersion(applicationConfig.apiVersion).build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(applicationConfig.swaggerUri, app, document);

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });


  await app.listen(port);
}
bootstrap();
