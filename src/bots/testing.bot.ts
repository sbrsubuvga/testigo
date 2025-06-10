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
      const selector = this.buildSelector(act.selector);
      if (!selector) {
        console.error('Invalid selector:', act.selector);
        const error = new Error('Invalid selector: ' + act.selector);
        return { browser, page, error }; // Return early if selector is invalid
      }
      if (act.action === 'type') {
        await page.waitForSelector(selector, { visible: true, timeout: 30000 });
        await page.type(selector, act.value || '', { delay: 50 });
      } else if (act.action === 'click') {
        await page.waitForSelector(selector, { visible: true, timeout: 30000 });
        await page.click(selector);
      } else if (act.action === 'hover') {
        await page.waitForSelector(selector, { visible: true, timeout: 30000 });
        await page.hover(selector);
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

    // // Hover over the "Items" menu to reveal the submenu
    // await page.waitForSelector('li.has-submenu[ng-reflect-ng-class*="items"]', {
    //   visible: true,
    // });
    // await page.hover('li.has-submenu[ng-reflect-ng-class*="items"]');

    // // Wait for "Categories" submenu item to appear
    // await page.waitForSelector('#sub-menu-categories', { visible: true });

    // // Click the "Categories" submenu item
    // await page.click('#sub-menu-categories');

    // // Optionally, wait for the Categories page to load
    // await page.waitForNavigation({ waitUntil: 'networkidle2' });

    // // Wait for the email input and type the email
    // await page.waitForSelector('#username', { visible: true, timeout: 30000 });
    // await page.type('#username', email, { delay: 50 });

    // // Wait for the password input and type the password
    // await page.waitForSelector('#password', { visible: true, timeout: 30000 });
    // await page.type('#password', password, { delay: 50 });

    // // Click the Login button
    // await page.click('button.btn.btn-primary');

    // // Wait for navigation or some indication of successful login
    // await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 60000 });

    // Return browser and page so other functions can use them
    return { browser, page };
  }

  private static buildSelector(sel: {
    id?: string;
    class?: string;
    tag?: string;
  }) {
    let selector = sel.tag || '';
    if (sel.id) selector += `#${sel.id}`;
    if (sel.class) selector += '.' + sel.class.trim().split(/\s+/).join('.');
    return selector;
  }
}
