import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const documentBuilder = new DocumentBuilder()
    .setTitle('Nestjs API Example')
    .setDescription('Documentation example')
    .setVersion('1.0')
    .addTag('nest')
    .build();

  const documentation = SwaggerModule.createDocument(app, documentBuilder);
  SwaggerModule.setup('api', app, documentation);

  await app.listen(3030, '0.0.0.0');
}
bootstrap();
