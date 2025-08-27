import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Constants } from '../utils/Constants';

export class CartPage extends BasePage {
  private readonly pageTitle: Locator;
  private readonly cartItems: Locator;
  private readonly checkoutButton: Locator;
  private readonly continueShoppingButton: Locator;
  private readonly cartList: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator('.title');
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.cartList = page.locator('.cart_list');
  }

  async verifyCartPageLoaded(): Promise<void> {
    await this.verifyElementVisible(this.pageTitle);
    await this.verifyElementText(this.pageTitle, 'Your Cart');
    await this.verifyCurrentUrl(Constants.CART_URL);
    await this.verifyCartElementsVisible();
  }

  private async verifyCartElementsVisible(): Promise<void> {
    await this.verifyElementVisible(this.cartList);
    await this.verifyElementVisible(this.checkoutButton);
    await this.verifyElementVisible(this.continueShoppingButton);
  }

  async verifyProductInCart(productName: string): Promise<void> {
    const productLocator = this.getProductLocatorInCart(productName);
    await this.verifyElementVisible(productLocator);
  }

  async verifySauceLabsBackpackInCart(): Promise<void> {
    await this.verifyProductInCart(Constants.SAUCE_LABS_BACKPACK);
  }

  private getProductLocatorInCart(productName: string): Locator {
    return this.cartItems.filter({ hasText: productName });
  }

  async getCartItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  async verifyCartItemCount(expectedCount: number): Promise<void> {
    const actualCount = await this.getCartItemCount();
    if (actualCount !== expectedCount) {
      throw new Error(`Expected ${expectedCount} items in cart, but found ${actualCount}`);
    }
  }

  async clickCheckout(): Promise<void> {
    await this.verifyElementVisible(this.checkoutButton);
    await this.clickElement(this.checkoutButton);
  }

  async clickContinueShopping(): Promise<void> {
    await this.verifyElementVisible(this.continueShoppingButton);
    await this.clickElement(this.continueShoppingButton);
  }

  async verifyCheckoutButtonVisible(): Promise<void> {
    await this.verifyElementVisible(this.checkoutButton);
  }

  async verifyContinueShoppingButtonVisible(): Promise<void> {
    await this.verifyElementVisible(this.continueShoppingButton);
  }

  async removeProductFromCart(productName: string): Promise<void> {
    const productLocator = this.getProductLocatorInCart(productName);
    const removeButton = productLocator.locator('[data-test="remove-sauce-labs-backpack"]');
    await this.clickElement(removeButton);
  }

  async removeSauceLabsBackpackFromCart(): Promise<void> {
    await this.removeProductFromCart(Constants.SAUCE_LABS_BACKPACK);
  }

  async verifyProductRemovedFromCart(productName: string): Promise<void> {
    const productLocator = this.getProductLocatorInCart(productName);
    const count = await productLocator.count();
    if (count > 0) {
      throw new Error(`Expected product "${productName}" to be removed from cart, but it's still present`);
    }
  }

  async verifySauceLabsBackpackRemovedFromCart(): Promise<void> {
    await this.verifyProductRemovedFromCart(Constants.SAUCE_LABS_BACKPACK);
  }
}
