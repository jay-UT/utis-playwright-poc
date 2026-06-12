import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { waitForElement } from '../utils/waitHelpers';

export class HomePage extends BasePage {
  private readonly navigationMenuSearchBar = this.page.locator('//input[@id="searchInputInsideNavigationMenu"]');
  private readonly searchValue = this.page.locator('//span[text()="Customers"]');
  private readonly customerSearchButton = this.page.locator('//granite-chip[@data-fnd="pageSearchButton"]');
 private  readonly nameFilter = this.page.locator('//div[@title="Name"]');
 private readonly nameFilterSearchPane = this.page.locator('//input[@data-fnd="search-pane-input"]');
 private readonly filterSearchButton= this.page.locator('//button[@data-fnd="searchButton"]');
 private readonly filtercheckbox = this.page.locator("//input[@type='checkbox']");
 private readonly detailsLink = this.page.locator('//span[text()=" Details "]');
 private readonly addressBar = this.page.locator("//div[@aria-label='Address']");
 private readonly companyAddressInfo = this.page.locator("//span[@class='multi-line icon-location']");
 private readonly saleBar = this.page.locator("//div[@aria-label='Sales']");
 private readonly showMoreButton = this.page.locator("//div[text()=' Show more ']");
 private readonly accountType = this.page.locator("//a[@aria-label='Customer Statistics Group']");
  constructor(page: Page) {
    super(page);
  }

  async SearchBarValue(searchTerm: string) {
    await this.navigationMenuSearchBar.fill(searchTerm);
  }

  async clickSearchBar() {
    await this.navigationMenuSearchBar.press('Enter');
  }
 
  async clickSearchValue() {
    await this.searchValue.click();
  }

  async clickCustomerSearchButton() {
    await this.customerSearchButton.click();
  }

  async clickNameFilter() {
    await this.nameFilter.click();
  }
  async enterNameInFilter(name: string) {
    await this.nameFilterSearchPane.waitFor({ state: 'visible' });
    await this.nameFilterSearchPane.click();
    await this.nameFilterSearchPane.fill(name);
  }
  async clickNameInFilter() {
    await this.nameFilterSearchPane.press('Enter');
  }
  async clickFilterSearchButton() {
    await this.filterSearchButton.click();
  }
  async clickFilterCheckbox() {
    //await this.filtercheckbox.waitFor({ state: 'visible' });
    await this.page.waitForTimeout(5000);
    await waitForElement(this.filtercheckbox);
    await this.filtercheckbox.click();
  }

  async clickDetailsLink() {
    await this.detailsLink.waitFor({ state: 'visible' });
    await this.detailsLink.click();
  }
  async clickAddressBar() {
    await this.addressBar.waitFor({ state: 'visible' });
    await this.addressBar.click();
  }
  async getCompanyAddressInfo() {
    await this.companyAddressInfo.scrollIntoViewIfNeeded()
    return await this.companyAddressInfo.innerText();
  }
  async showMore() {
    await this.showMoreButton.click();
  }

  async clickSaleBar() {
    await this.saleBar.click();
  }
  async getAccountType() {
    return await this.accountType.innerText();
  }
}
