import { setWorldConstructor, World, IWorldOptions, setDefaultTimeout } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from 'playwright';
import { ENV } from '../../config/env.config';

setDefaultTimeout(ENV.DEFAULT_TIMEOUT * 2);

/**
 * CustomWorld — shared state for each scenario.
 * Every step definition gets `this` typed as CustomWorld.
 */
export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;

  /** Scratchpad for passing data between steps within a scenario */
  testData: Record<string, unknown> = {};

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);
