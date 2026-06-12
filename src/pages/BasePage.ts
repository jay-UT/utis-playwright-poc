import { Page, Locator, expect } from '@playwright/test';
import { ENV } from '../../config/env.config';
import { logger } from '../utils/logger';

/**
 * BasePage — all page objects extend this.
 * Contains reusable, logged, self-waiting wrapper actions.
 */
export abstract class BasePage {
  constructor(protected page: Page) {}

  // ── Navigation ────────────────────────────────────────────
  async navigateTo(path: string = ''): Promise<void> {
    const url = `${ENV.BASE_URL}${path}`;
    logger.info(`Navigating to: ${url}`);
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  // ── Actions ───────────────────────────────────────────────
  async click(locator: Locator, name?: string): Promise<void> {
    logger.info(`Clicking: ${name ?? locator.toString()}`);
    await locator.waitFor({ state: 'visible' });
    await locator.click();
  }

  async fill(locator: Locator, value: string, name?: string): Promise<void> {
    logger.info(`Filling "${name ?? locator.toString()}" with value`);
    await locator.waitFor({ state: 'visible' });
    await locator.fill(value);
  }

  async type(locator: Locator, value: string, delayMs = 50): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.pressSequentially(value, { delay: delayMs });
  }

  async selectByValue(locator: Locator, value: string): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.selectOption({ value });
  }

  async selectByLabel(locator: Locator, label: string): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.selectOption({ label });
  }

  async hover(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.hover();
  }

  async pressKey(key: string): Promise<void> {
    await this.page.keyboard.press(key);
  }

  // ── Getters ───────────────────────────────────────────────
  async getText(locator: Locator): Promise<string> {
    await locator.waitFor({ state: 'visible' });
    return (await locator.textContent())?.trim() ?? '';
  }

  async getValue(locator: Locator): Promise<string> {
    return locator.inputValue();
  }

  async isVisible(locator: Locator): Promise<boolean> {
    return locator.isVisible();
  }

  async isEnabled(locator: Locator): Promise<boolean> {
    return locator.isEnabled();
  }

  // ── Waits ─────────────────────────────────────────────────
  async waitForVisible(locator: Locator, timeout = ENV.DEFAULT_TIMEOUT): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }

  async waitForHidden(locator: Locator, timeout = ENV.DEFAULT_TIMEOUT): Promise<void> {
    await locator.waitFor({ state: 'hidden', timeout });
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  // ── Assertions ────────────────────────────────────────────
  async assertVisible(locator: Locator, name?: string): Promise<void> {
    logger.info(`Asserting visible: ${name ?? locator.toString()}`);
    await expect(locator).toBeVisible();
  }

  async assertText(locator: Locator, expected: string): Promise<void> {
    await expect(locator).toHaveText(expected);
  }

  async assertContainsText(locator: Locator, expected: string): Promise<void> {
    await expect(locator).toContainText(expected);
  }

  async assertUrlContains(fragment: string): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(fragment));
  }

  async assertTitleContains(fragment: string): Promise<void> {
    await expect(this.page).toHaveTitle(new RegExp(fragment));
  }

  // ── Utilities ─────────────────────────────────────────────
  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({
      path: `reports/screenshots/${name}_${Date.now()}.png`,
      fullPage: true,
    });
  }

  async scrollToElement(locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
  }
}
