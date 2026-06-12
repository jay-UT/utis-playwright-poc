import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  private readonly ifsCloudSignIn = this.page.locator('a[href="/main/ifsapplications/web"]');
  private readonly usernameInput  = this.page.getByRole('textbox', { name: 'Username' });
  private readonly passwordInput  = this.page.getByRole('textbox', { name: 'Password' });
  private readonly signInButton   = this.page.getByRole('button', { name: 'Sign in' });
  private readonly header         = this.page.locator('//div[@data-fnd="branding-logo"]');

  constructor(page: Page) {
    super(page);
  }

  async ifsCloud(): Promise<void> {
    await this.navigateTo('');
    await this.ifsCloudSignIn.click();
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
    await this.page.waitForLoadState('load');
  }

  async isHeaderVisible(): Promise<boolean> {
    await this.header.waitFor({ state: 'visible' });
    return this.header.isVisible();
  }
}