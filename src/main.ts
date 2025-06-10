import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 9000);
  console.log('Server is running on http://localhost:9000');
}
bootstrap();

// ...Main entry point will go here...
