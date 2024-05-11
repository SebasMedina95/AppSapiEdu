import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {

  //? Entrada de la aplicación
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  //? Alias de la aplicación
  app.setGlobalPrefix('api-sapiedu/v1');

  //? Configuración global
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  );

  //? Para documentación Swagger
  //TODO -> Pendiente ...

  //? Configuración del cors
  app.enableCors();

  await app.listen( process.env.PORT );
  logger.log(`La APP está corriendo en puerto ${process.env.PORT}`);

}
bootstrap();
