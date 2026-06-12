import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  const config = new DocumentBuilder().setTitle('Supply Warehouse API').setVersion('1.0').build();
  SwaggerModule.setup('api-docs', app, SwaggerModule.createDocument(app, config));
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
