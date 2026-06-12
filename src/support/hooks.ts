import {
  Before,
  After,
  BeforeAll,
  AfterAll,
  Status,
  ITestCaseHookParameter,
} from '@cucumber/cucumber';
import { chromium, firefox, webkit, Browser } from 'playwright';
import * as fs from 'fs';
import { CustomWorld } from './world';
import { ENV } from '../../config/env.config';
import { logger } from '../utils/logger';

let browser: Browser;

// ─────────────────────────────────────────────────────────────
// BeforeAll — launch one browser for the whole run
// ─────────────────────────────────────────────────────────────
BeforeAll(async function () {
  logger.info(`Launching browser: ${ENV.BROWSER} | headless: ${ENV.HEADLESS}`);

  const launchOptions = { headless: ENV.HEADLESS, slowMo: ENV.SLOW_MO };

  switch (ENV.BROWSER) {
    case 'firefox':
      browser = await firefox.launch(launchOptions);
      break;
    case 'webkit':
      browser = await webkit.launch(launchOptions);
      break;
    default:
      browser = await chromium.launch(launchOptions);
  }
});

// ─────────────────────────────────────────────────────────────
// Before — fresh context + page per scenario (full isolation)
// ─────────────────────────────────────────────────────────────
Before(async function (this: CustomWorld, scenario: ITestCaseHookParameter) {
  logger.info(`▶ Starting scenario: ${scenario.pickle.name}`);

  this.browser = browser;
  this.context = await browser.newContext({
    viewport: ENV.VIEWPORT,
    ignoreHTTPSErrors: true,
  });
  this.context.setDefaultTimeout(ENV.DEFAULT_TIMEOUT);
  this.context.setDefaultNavigationTimeout(ENV.NAVIGATION_TIMEOUT);

  this.page = await this.context.newPage();
});

// ─────────────────────────────────────────────────────────────
// After — screenshot on failure (attached to HTML report), cleanup
// ─────────────────────────────────────────────────────────────
After(async function (this: CustomWorld, scenario: ITestCaseHookParameter) {
  const scenarioName = scenario.pickle.name.replace(/[^a-zA-Z0-9]/g, '_');

  if (scenario.result?.status === Status.FAILED) {
    logger.error(`✖ Scenario FAILED: ${scenario.pickle.name}`);

    const screenshotPath = `reports/screenshots/${scenarioName}_${Date.now()}.png`;
    const screenshot = await this.page.screenshot({ path: screenshotPath, fullPage: true });

    // Attach to cucumber HTML/JSON report
    this.attach(screenshot, 'image/png');
  } else {
    logger.info(`✔ Scenario PASSED: ${scenario.pickle.name}`);
  }

  await this.page?.close();
  await this.context?.close();
});

// ─────────────────────────────────────────────────────────────
// AfterAll — close browser
// ─────────────────────────────────────────────────────────────
AfterAll(async function () {
  await browser?.close();
  logger.info('Browser closed. Run complete.');
});

// Ensure screenshots dir exists at startup
if (!fs.existsSync('reports/screenshots')) {
  fs.mkdirSync('reports/screenshots', { recursive: true });
}
