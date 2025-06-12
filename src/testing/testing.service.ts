import { Injectable } from '@nestjs/common';
import { TestingDto } from './dto/testing.dto';
import { TestingBot } from 'src/bots/testing.bot';

@Injectable()
export class TestingService {
  constructor() {}

  async startTesting(body: TestingDto) {
    const { browser, page, error } = await TestingBot.start(body);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await page.close();
    await browser.close();
    if (error) {
      return {
        status: 'error',
        message: 'An error occurred during testing.',
        error: error,
      };
    } else {
      return {
        status: 'testing_started',
        message: 'Testing has started.',
        browser: browser,
        page: page,
      };
    }
  }
}
