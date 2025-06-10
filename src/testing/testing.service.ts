import { Injectable } from '@nestjs/common';
import { TestingDto } from './dto/testing.dto';
import { TestingBot } from 'src/bots/testing.bot';

@Injectable()
export class TestingService {
  constructor() {}

  async startTesting({ url }: TestingDto) {
    const { browser, page } = await TestingBot.start(url);

    return {
      status: 'testing_started',
      message: 'Testing has started.',
      browser: browser,
      page: page,
    };
  }
}
