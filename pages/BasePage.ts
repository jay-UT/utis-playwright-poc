import { Page } from '@playwright/test';
import { config } from '../utils/config';

export class BasePage {
  constructor(protected page: Page) {}

  async setup() {
    await this.page.goto(config.baseUrl);
  }
  async ifsCloud(){
    const ifsCloudLink = this.page.locator("a[href='/main/ifsapplications/web']");
    await ifsCloudLink.click();
    console.log("Navigated to IFS Cloud");
  }
}
