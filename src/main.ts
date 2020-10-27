import { NestFactory, HttpAdapterHost } from '@nestjs/core';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

// import {
//   FastifyAdapter,
//   NestFastifyApplication,
// } from '@nestjs/platform-fastify';

import { AppModule } from '@app/app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { HandlerInterceptor } from './interceptors/handler.interceptor';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // Default Config
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Terior Renewal APIs')
    .setDescription('Lastmile-Works')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  //Fastify Config
  // const app = await NestFactory.create<NestFastifyApplication>(
  //   AppModule,
  //   new FastifyAdapter()
  // );

  //Use Http Exception Filter
  app.useGlobalFilters(new HttpExceptionFilter());

  //Use Middlewares Logger
  app.use(LoggerMiddleware);

  //Interceptors have a set of useful capabilities which are inspired by the Aspect Oriented Programming (AOP) technique. They make it possible to:
  //  bind extra logic before / after method execution
  //  transform the result returned from a function
  //  transform the exception thrown from a function
  //  extend the basic function behavior
  //  completely override a function depending on specific conditions (e.g., for caching purposes)
  app.useGlobalInterceptors(new HandlerInterceptor());

  app.useGlobalPipes(new ValidationPipe());

  // By default, Fastify listens only on the localhost 127.0.0.1 interface (read more).
  // If you want to accept connections on other hosts, you should specify '0.0.0.0' in the listen() call:
  await app.listen(3000);

}
bootstrap();
