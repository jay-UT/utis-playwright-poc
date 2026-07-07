import { test as base, chromium, BrowserContext, Page } from '@playwright/test';
import * as fs from 'fs';
import { IFS_LoginPage } from '../pages/IFS_LoginPage';
import { IFS_HomePage } from '../pages/IFS_HomePage';
import { config } from '../utils/config';

export const test = base.extend<{
  context: BrowserContext;
  page: Page;
  loginPage: IFS_LoginPage;
  homePage: IFS_HomePage;
}>({
  // Persistent Chrome profile when enabled, default context otherwise
  context: async ({ context }, use) => {
    if (!config.useChromeProfile) {
      await use(context);
      return;
    }
    if (!fs.existsSync(config.chromeUserDataDir)) {
      fs.mkdirSync(config.chromeUserDataDir, { recursive: true });
    }
    const persistentContext = await chromium.launchPersistentContext(
      config.chromeUserDataDir,
      {
        channel: 'chrome',
        headless: false,
        args: [`--profile-directory=${config.chromeProfileName}`, '--start-maximized'],
        viewport: null,
        deviceScaleFactor: undefined,
      } as any
    );
    await use(persistentContext);
    await persistentContext.close();
  },

  // Reuse the profile's initial tab instead of opening a new one
  page: async ({ context }, use) => {
    const page = config.useChromeProfile
      ? context.pages()[0] ?? (await context.newPage())
      : await context.newPage();
    await use(page);
  },

  loginPage: async ({ page }, use) => {
    const lp = new IFS_LoginPage(page);
    await lp.setup();
    await use(lp);
  },
  homePage: async ({ page }, use) => {
    const hp = new IFS_HomePage(page);
    await hp.setup();
    await use(hp);
  },
});

export { expect } from '@playwright/test';