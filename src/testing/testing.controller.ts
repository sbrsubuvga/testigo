import { Controller, Post, Body } from '@nestjs/common';
import { TestingService } from './testing.service';
import { TestingDto } from './dto/testing.dto';

@Controller('testing')
export class TestingController {
  constructor(private readonly testingService: TestingService) {}

  @Post('start')
  async start(@Body() body: TestingDto) {
    return this.testingService.startTesting(body);
  }

}
