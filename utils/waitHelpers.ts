import { Page, Locator } from '@playwright/test';

export async function waitForElement(locator: Locator, timeout = 10000): Promise<void> {
  await locator.waitFor({ state: 'visible', timeout });
}

export async function waitForUrl(page: Page, urlPattern: string | RegExp, timeout = 10000): Promise<void> {
  await page.waitForURL(urlPattern, { timeout });
}

export async function waitForNetworkIdle(page: Page, timeout = 10000): Promise<void> {
  await page.waitForLoadState('networkidle', { timeout });
}
