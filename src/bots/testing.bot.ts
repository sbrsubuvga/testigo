import puppeteer from 'puppeteer';
export class TestingBot {
  static async start(url: string) {
    const email = 'kot@lithospos.com';
    const password = 'demo123';
    const browser = await puppeteer.launch({
      headless: false,
      args: [
        '--use-fake-ui-for-media-stream',
        '--no-sandbox',
        '--start-maximized',
      ],
      defaultViewport: {
        width: 1920,
        height: 1080,
      },
    });

    const page = await browser.newPage();

    // Go to login page
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

    // Wait for the email input and type the email
    await page.waitForSelector('#username', { visible: true, timeout: 30000 });
    await page.type('#username', email, { delay: 50 });

    // Wait for the password input and type the password
    await page.waitForSelector('#password', { visible: true, timeout: 30000 });
    await page.type('#password', password, { delay: 50 });

    // Click the Login button
    await page.click('button.btn.btn-primary');

    // Wait for navigation or some indication of successful login
    await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 60000 });

    return {
      status: 'testing_completed',
      message: 'Testing has completed successfully.',
    };
  }
}
