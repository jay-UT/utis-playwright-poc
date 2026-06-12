import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
  baseUrl: process.env.BASE_URL ?? 'https://hsglobal-uat.ifs.cloud/landing-page/',
  username: process.env.APP_USERNAME ?? '',
  password: process.env.APP_PASSWORD ?? '',
  timeout: Number(process.env.TIMEOUT ?? 30000),
};
