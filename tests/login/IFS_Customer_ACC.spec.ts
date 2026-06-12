import { test, expect } from '../../fixtures/customFixtures';
import { testData } from '../../test-data/testData';

test.describe('Customer Details', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.setup();
  });

  test('IFS Customer account details extraction @IFS @demo @smoke @regression', async ({ loginPage, page, homePage }) => {
    await test.step('Navigate to IFS Cloud', async () => {
      await loginPage.ifsCloud();
    });

    await test.step('Login with valid credentials', async () => {
      await loginPage.login(testData.validUser.username, testData.validUser.password);
      await page.waitForLoadState('load');
      await expect(loginPage.isHeaderVisible()).resolves.toBeTruthy();
    });

    await test.step('Search for Customers module', async () => {
      await homePage.SearchBarValue('Customers');
      await homePage.clickSearchBar();
      await homePage.clickSearchValue();
    });

    await test.step('Open Customer search panel', async () => {
      await homePage.clickCustomerSearchButton();
    });

    await test.step('Filter by customer name', async () => {
      await homePage.clickNameFilter();
      await homePage.enterNameInFilter('HENRY SCHEIN FRANCE-JOUE LES TOURS');
      await homePage.clickNameInFilter();
      await homePage.clickFilterSearchButton();
    });

    await test.step('Select customer from results', async () => {
      await homePage.clickFilterCheckbox();
      await homePage.clickDetailsLink();
    });

    await test.step('Extract company address info', async () => {
      await homePage.clickAddressBar();
      const address = await homePage.getCompanyAddressInfo();
      console.log('Company Address:', address);
    });

    await test.step('Extract account type from Sales tab', async () => {
      await homePage.showMore();
      await homePage.clickSaleBar();
      const accountType = await homePage.getAccountType();
      console.log('Account Type:', accountType);
    });
  });

});
