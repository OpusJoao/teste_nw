import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { SeedService } from './seed/seed.service';

async function bootstrap() {
  initializeTransactionalContext();
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('teste_nw')
    .setDescription('Api para teste nw')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Digite o token JWT aqui (Bearer token)',
        in: 'header',
      },
      'access-token', // chave de segurança, usada no decorator @ApiBearerAuth()
    )
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  const seedService = app.get(SeedService);
  await seedService.seedAdminUser();

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
