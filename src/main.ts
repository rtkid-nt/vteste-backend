import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const port = config.get<number>('API_PORT');

  console.log('PORT: !!!!!!!!!!!!!! !', port);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('VTeste')
    .setDescription('The VTeste API description')
    .setVersion('1.0')
    .addTag('VTeste')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
}
bootstrap();
