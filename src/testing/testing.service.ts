import { Injectable } from '@nestjs/common';
import { TestingDto } from './dto/testing.dto';
import { TestingBot } from 'src/bots/testing.bot';

@Injectable()
export class TestingService {
  constructor() {}

  async startTesting({ url }: TestingDto) {
    await TestingBot.start(url);

    return { status: 'testing_started', message: 'Testing has started.' };
  }
}
