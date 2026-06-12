import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { waitForElement } from '../utils/waitHelpers';

export class IFS_LoginPage extends BasePage {
  private readonly usernameInput = this.page.locator('//input[@id="username"]');
  private readonly passwordInput = this.page.locator('//input[@id="password"]');
  private readonly signInButton = this.page.locator('//input[@value="Sign in"]');
  private readonly errorMessage = this.page.locator('.error-message');
  private readonly header = this.page.locator('//div[@data-fnd="branding-logo"]');
  constructor(page: Page) {
    super(page);
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }

  async getErrorMessage(): Promise<string> {
    return await this.errorMessage.textContent() ?? '';
  }

  async isHeaderVisible(): Promise<boolean> {
    await waitForElement(this.header);
    return await this.header.isVisible();
  }
}
