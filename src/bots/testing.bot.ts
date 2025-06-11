import puppeteer from 'puppeteer';
import { TestingDto } from 'src/testing/dto/testing.dto';
export class TestingBot {
  static async start(body: TestingDto) {
    const browser = await puppeteer.launch({
      headless: false,
      args: [
        '--use-fake-ui-for-media-stream',
        '--no-sandbox',
        '--start-maximized',
        '--disable-save-password-bubble',
        '--use-fake-ui-for-media-stream',
        '--no-sandbox',
        '--start-maximized',
        '--disable-save-password-bubble',
        '--disable-password-manager-reauthentication',
        '--disable-features=AutofillServerCommunication,PasswordManagerService,AutofillEnableAccountWalletStorage',
        '--disable-blink-features=CredentialManagerAPI',
      ],
      defaultViewport: {
        width: 1920,
        height: 1080,
      },
    });

    const page = await browser.newPage();

    // Go to login page
    await page.goto(body.url, {
      waitUntil: 'networkidle2',
      timeout: body.timeout || 60000,
    });
    for (const act of body.actions) {
      console.log(
        'Performing action:',
        act.action,
        'on selector:',
        act.selector,
      );
      const selector = act.selector.trim();
      if (!selector) {
        console.error('Invalid selector:', act.selector);
        const error = new Error('Invalid selector: ' + act.selector);
        return { browser, page, error };
      }
      if (act.action === 'type') {
        console.log('Waiting for element to be inputable:');
        const element = await page.waitForSelector(selector, {
          visible: true,
          timeout: 3000,
        });
        console.log('Typing into element:', selector);
        await element.type(act.value || '', { delay: 100 });
      } else if (act.action === 'click') {
        console.log('Waiting for element to be clickable:');
        const element = await page.waitForSelector(selector, {
          visible: true,
          timeout: 3000,
        });
        console.log('Clicking on element:', selector);
        await element.click();
      } else if (act.action === 'hover') {
        console.log('Waiting for element to be hoverable:');
        const element = await page.waitForSelector(selector, {
          visible: true,
          timeout: 3000,
        });
        console.log('Hovering over element:', selector);
        await element.hover();
      }
      if (act.waiting_after) {
        const waitTimeout = act.waiting_after.timeout || 60000;
        if (
          act.waiting_after.for === 'networkidle2' ||
          act.waiting_after.for === 'domcontentloaded' ||
          act.waiting_after.for === 'load'
        ) {
          await page.waitForNavigation({
            waitUntil: act.waiting_after.for,
            timeout: waitTimeout,
          });
        } else if (
          act.waiting_after.for === 'visible' &&
          act.waiting_after.until
        ) {
          await page.waitForSelector(act.waiting_after.until, {
            visible: true,
            timeout: waitTimeout,
          });
        }
        // Add more wait types as needed
      }
    }

    return { browser, page };
  }
}
