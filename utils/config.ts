import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config();

export const config = {
  baseUrl: process.env.BASE_URL ?? 'https://hsglobal-uat.ifs.cloud/landing-page/',
  username: process.env.APP_USERNAME ?? '',
  password: process.env.APP_PASSWORD ?? '',
  timeout: Number(process.env.TIMEOUT ?? 30000),
  
  // Chrome Profile
  useChromeProfile: process.env.USE_CHROME_PROFILE === 'true',
  chromeUserDataDir: process.env.CHROME_USER_DATA_DIR ?? '',
  chromeProfileName: process.env.CHROME_PROFILE_NAME ?? 'Default',

};
