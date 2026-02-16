import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  // Enable CORS
  app.enableCors({
    origin: [
      'http://localhost:4200',
      'http://localhost:4200/',
      'https://buckeroneer.github.io',
      'https://buckeroneer.github.io/',
      'https://buckeroneer.github.io/scib-front-test-santander',
      'https://buckeroneer.github.io/scib-front-test-santander/',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
