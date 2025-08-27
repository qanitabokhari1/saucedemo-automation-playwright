import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Constants } from '../utils/Constants';

export class CheckoutCompletePage extends BasePage {
  private readonly pageTitle: Locator;
  private readonly completeHeader: Locator;
  private readonly completeText: Locator;
  private readonly ponyExpressImage: Locator;
  private readonly backHomeButton: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator('.title');
    this.completeHeader = page.locator('.complete-header');
    this.completeText = page.locator('.complete-text');
    this.ponyExpressImage = page.locator('.pony_express');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }

  async verifyPageLoaded(): Promise<void> {
    await this.verifyElementVisible(this.pageTitle);
    await this.verifyElementText(this.pageTitle, 'Checkout: Complete!');
    await this.verifyCurrentUrl(Constants.CHECKOUT_COMPLETE_URL);
    await this.verifySuccessElementsVisible();
  }

  private async verifySuccessElementsVisible(): Promise<void> {
    await this.verifyElementVisible(this.completeHeader);
    await this.verifyElementVisible(this.completeText);
    await this.verifyElementVisible(this.ponyExpressImage);
    await this.verifyElementVisible(this.backHomeButton);
  }

  async verifyOrderCompleteMessage(): Promise<void> {
    await this.verifyElementVisible(this.completeHeader);
    await this.verifyElementText(this.completeHeader, Constants.ORDER_COMPLETE_HEADER);
  }

  async verifyThankYouMessage(): Promise<void> {
    await this.verifyElementVisible(this.completeText);
    await this.verifyElementText(this.completeText, Constants.ORDER_COMPLETE_MESSAGE);
  }

  async clickBackHome(): Promise<void> {
    await this.verifyElementVisible(this.backHomeButton);
    await this.clickElement(this.backHomeButton);
  }

  async verifyCompleteOrderSuccess(): Promise<void> {
    await this.verifyPageLoaded();
    await this.verifyOrderCompleteMessage();
    await this.verifyThankYouMessage();
  }

  async verifySuccessMessage(expectedMessage: string): Promise<void> {
    const actualMessage = await this.getElementText(this.completeText);
    if (!actualMessage.includes(expectedMessage)) {
      throw new Error(`Expected message to contain "${expectedMessage}" but got "${actualMessage}"`);
    }
  }
}
