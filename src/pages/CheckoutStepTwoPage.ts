import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Constants } from '../utils/Constants';

export class CheckoutStepTwoPage extends BasePage {
  private readonly pageTitle: Locator;
  private readonly orderSummary: Locator;
  private readonly finishButton: Locator;
  private readonly cancelButton: Locator;
  private readonly orderItems: Locator;
  private readonly subtotalLabel: Locator;
  private readonly taxLabel: Locator;
  private readonly totalLabel: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator('.title');
    this.orderSummary = page.locator('.summary_info');
    this.finishButton = page.locator('[data-test="finish"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.orderItems = page.locator('.cart_item');
    this.subtotalLabel = page.locator('.summary_subtotal_label');
    this.taxLabel = page.locator('.summary_tax_label');
    this.totalLabel = page.locator('.summary_total_label');
  }

  async verifyPageLoaded(): Promise<void> {
    await this.verifyElementVisible(this.pageTitle);
    await this.verifyElementText(this.pageTitle, 'Checkout: Overview');
    await this.verifyCurrentUrl(Constants.CHECKOUT_STEP_TWO_URL);
    await this.verifyOrderSummaryElementsVisible();
  }

  private async verifyOrderSummaryElementsVisible(): Promise<void> {
    await this.verifyElementVisible(this.orderSummary);
    await this.verifyElementVisible(this.finishButton);
    await this.verifyElementVisible(this.cancelButton);
    await this.verifyElementVisible(this.subtotalLabel);
    await this.verifyElementVisible(this.taxLabel);
    await this.verifyElementVisible(this.totalLabel);
  }

  async verifyProductInOrderSummary(productName: string): Promise<void> {
    const productLocator = this.getProductLocatorInOrderSummary(productName);
    await this.verifyElementVisible(productLocator);
  }

  async verifySauceLabsBackpackInOrderSummary(): Promise<void> {
    await this.verifyProductInOrderSummary(Constants.SAUCE_LABS_BACKPACK);
  }

  private getProductLocatorInOrderSummary(productName: string): Locator {
    return this.orderItems.filter({ hasText: productName });
  }

  async getOrderItemCount(): Promise<number> {
    return await this.orderItems.count();
  }

  async verifyOrderItemCount(expectedCount: number): Promise<void> {
    const actualCount = await this.getOrderItemCount();
    if (actualCount !== expectedCount) {
      throw new Error(`Expected ${expectedCount} items in order, but found ${actualCount}`);
    }
  }

  async clickFinish(): Promise<void> {
    await this.verifyElementVisible(this.finishButton);
    await this.clickElement(this.finishButton);
  }

  async clickCancel(): Promise<void> {
    await this.verifyElementVisible(this.cancelButton);
    await this.clickElement(this.cancelButton);
  }

  async verifyFinishButtonVisible(): Promise<void> {
    await this.verifyElementVisible(this.finishButton);
  }

  async verifyCancelButtonVisible(): Promise<void> {
    await this.verifyElementVisible(this.cancelButton);
  }

  async verifyOrderSummaryComplete(): Promise<void> {
    await this.verifyElementVisible(this.subtotalLabel);
    await this.verifyElementVisible(this.taxLabel);
    await this.verifyElementVisible(this.totalLabel);
  }

  async getSubtotalAmount(): Promise<string> {
    const subtotalText = await this.getElementText(this.subtotalLabel);
    return subtotalText.replace('Item total: $', '');
  }

  async getTaxAmount(): Promise<string> {
    const taxText = await this.getElementText(this.taxLabel);
    return taxText.replace('Tax: $', '');
  }

  async getTotalAmount(): Promise<string> {
    const totalText = await this.getElementText(this.totalLabel);
    return totalText.replace('Total: $', '');
  }
}
