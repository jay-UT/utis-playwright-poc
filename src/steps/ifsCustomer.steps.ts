import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { ENV } from '../../config/env.config';

Given('I navigate to the IFS Cloud application', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.ifsCloud();
});

When('I login with valid credentials', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.login(ENV.USERNAME, ENV.PASSWORD);
});

Then('the home page header should be visible', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  await expect(loginPage.isHeaderVisible()).resolves.toBeTruthy();
});

When('I search for {string} in the navigation menu', async function (this: CustomWorld, term: string) {
  const homePage = new HomePage(this.page);
  await homePage.SearchBarValue(term);
});

When('I select the search result', async function (this: CustomWorld) {
  const homePage = new HomePage(this.page);
  await homePage.clickSearchValue();
});

When('I click the customer search button', async function (this: CustomWorld) {
  const homePage = new HomePage(this.page);
  await homePage.clickCustomerSearchButton();
});

When('I click the name filter', async function (this: CustomWorld) {
  const homePage = new HomePage(this.page);
  await homePage.clickNameFilter();
});

When('I enter {string} in the name filter', async function (this: CustomWorld, name: string) {
  const homePage = new HomePage(this.page);
  await homePage.enterNameInFilter(name);
});