import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { TestingController } from './testing/testing.controller';
import { TestingService } from './testing/testing.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [TestingController],
  providers: [TestingService],
})
export class AppModule {}
