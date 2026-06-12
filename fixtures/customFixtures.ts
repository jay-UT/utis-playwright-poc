import { test as base } from '@playwright/test';
import { IFS_LoginPage } from '../pages/IFS_LoginPage';
import { IFS_HomePage } from '../pages/IFS_HomePage';

export const test = base.extend<{
  loginPage: IFS_LoginPage;
  homePage: IFS_HomePage;
}>({
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
