import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  private readonly pageSearchInput  = this.page.getByRole('textbox', { name: 'Type to find a page' });
  private readonly customersResult  = this.page.getByRole('link', { name: 'Customers' }).first();
  private readonly searchOption     = this.page.getByRole('option', { name: 'Search' });
  private readonly nameFilterToggle = this.page.locator('#fndSearchPanel-filterPane-fndFieldFilter-Name .icon-triangle-down');
  private readonly filterInput      = this.page.getByRole('textbox', { name: 'Filter' });
  private readonly searchButton     = this.page.getByRole('button', { name: 'Search', exact: true });

  constructor(page: Page) {
    super(page);
  }

  async SearchBarValue(searchTerm: string): Promise<void> {
    await this.pageSearchInput.click();
    await this.pageSearchInput.fill(searchTerm);
    await this.pageSearchInput.press('Enter');
  }

  async clickSearchValue(): Promise<void> {
    
    await this.customersResult.click();
  }

  async clickCustomerSearchButton(): Promise<void> {
    await this.searchOption.click();
  }

  async clickNameFilter(): Promise<void> {
    await this.nameFilterToggle.click();
  }

  async enterNameInFilter(name: string): Promise<void> {
    await this.filterInput.waitFor({ state: 'visible' });
    await this.filterInput.fill(name);
    await this.searchButton.click();
  }
}