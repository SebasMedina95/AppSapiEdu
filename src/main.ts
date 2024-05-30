import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { join } from 'path';

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
  const config = new DocumentBuilder()
    .setTitle('SapiEdu - API RESTful')
    .setDescription('Esta es la documentación para la aplicación backend de SapiEdu. En este documento se encuentran registrados todos los End Point que han sido usados para la elaboración del backend y con sus indicaciones respectivas para el correcto funcionamiento de cada uno. Puede ver más información independiente de estos al ingresar a cada uno y seguir las indicaciones necesarias para su operación adecuada en el consumo desde un Front. Definiciones adicionales: La aplicación se encuentra ejecutada usando el Framework NestJS de Node y estamos trabajando con una base de datos PostgreSQL mediante el uso de una imagen de Docker y el uso también de TypeORM para el manejo de las consultas a la base de datos.')
    .setContact('Juan Sebastian Medina Toro', 'https://www.linkedin.com/in/juan-sebastian-medina-toro-887491249/', 'jsebastian19952011@gmail.com')
    .addServer('http://localhost:3333/api-sapiedu/v1/')
    .setLicense('Descripción de la Licencia', 'https://www.linkedin.com/in/juan-sebastian-medina-toro-887491249/')
    .setTermsOfService("Aplicación de uso exclusivo por Juan Sebastian Medina Toro")
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token', // Este es el nombre de la referencia para los controladores
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-sapiedu-documentation', app, document);

  //? Configuración del cors
  app.enableCors();

  await app.listen( process.env.PORT );
  logger.log(`La APP está corriendo en puerto ${process.env.PORT}`);

}
bootstrap();
