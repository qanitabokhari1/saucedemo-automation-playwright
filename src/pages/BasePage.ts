import { Page, Locator, expect } from '@playwright/test';

export abstract class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async waitForElementVisible(locator: Locator, timeout: number = 10000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }

  async waitForElementClickable(locator: Locator, timeout: number = 10000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
    await expect(locator).toBeEnabled();
  }

  async waitAfterDataEntry(timeout: number = 1000): Promise<void> {
    await this.page.waitForTimeout(timeout);
  }

  async clickElement(locator: Locator): Promise<void> {
    await this.waitForElementClickable(locator);
    await locator.click();
  }

  async fillInput(locator: Locator, text: string, waitAfterEntry: boolean = true): Promise<void> {
    await this.waitForElementVisible(locator);
    await locator.clear();
    await locator.fill(text);
    if (waitAfterEntry) {
      await this.waitAfterDataEntry();
    }
  }

  async getElementText(locator: Locator): Promise<string> {
    await this.waitForElementVisible(locator);
    return await locator.textContent() || '';
  }

  async verifyElementVisible(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
  }

  async verifyElementText(locator: Locator, expectedText: string): Promise<void> {
    await expect(locator).toHaveText(expectedText);
  }

  async verifyCurrentUrl(expectedUrl: string | RegExp): Promise<void> {
    await expect(this.page).toHaveURL(expectedUrl);
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }
}
