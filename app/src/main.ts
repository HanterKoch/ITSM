import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const serverConfig = {
    PORT: 3000,
  }

  const swaggerConfig = new DocumentBuilder().build();

  const swagegrDocument = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api', app, swagegrDocument);

  await app.listen(serverConfig.PORT).then(() => Logger.log(`Server started on port ${serverConfig.PORT}`, AppModule.name));
}
bootstrap();
