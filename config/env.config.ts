import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

/**
 * Central typed configuration.
 * All values come from .env — never hardcode URLs/credentials in code.
 */
export const ENV = {
  BASE_URL: process.env.BASE_URL || '',
  USERNAME: process.env.APP_USERNAME || '',
  PASSWORD: process.env.APP_PASSWORD || '',

  BROWSER: (process.env.BROWSER || 'chromium') as 'chromium' | 'firefox' | 'webkit',
  HEADLESS: process.env.HEADLESS !== 'false',

  DEFAULT_TIMEOUT: Number(process.env.DEFAULT_TIMEOUT || 30000),
  NAVIGATION_TIMEOUT: Number(process.env.NAVIGATION_TIMEOUT || 60000),

  SLOW_MO: Number(process.env.SLOW_MO || 0),
  VIEWPORT: {
    width: Number(process.env.VIEWPORT_WIDTH || 1920),
    height: Number(process.env.VIEWPORT_HEIGHT || 1080),
  },
};
