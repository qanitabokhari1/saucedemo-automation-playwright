import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Constants } from '../utils/Constants';

export class ProductsPage extends BasePage {
  private readonly pageTitle: Locator;
  private readonly shoppingCartLink: Locator;
  private readonly shoppingCartBadge: Locator;
  private readonly inventoryContainer: Locator;
  private readonly menuButton: Locator;
  private readonly sortDropdown: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator('.title');
    this.shoppingCartLink = page.locator('.shopping_cart_link');
    this.shoppingCartBadge = page.locator('.shopping_cart_badge');
    this.inventoryContainer = page.locator('.inventory_container');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.sortDropdown = page.locator('.product_sort_container');
  }

  async verifyProductsPageLoaded(): Promise<void> {
    await this.verifyElementVisible(this.pageTitle);
    await this.verifyElementVisible(this.inventoryContainer);
    await this.verifyCurrentUrl(Constants.INVENTORY_URL);
  }

  async clickShoppingCart(): Promise<void> {
    await this.clickElement(this.shoppingCartLink);
  }

  private getProductLocator(productName: string): Locator {
    return this.page.locator('.inventory_item').filter({ hasText: productName });
  }

  private getAddToCartButtonLocator(productName: string): Locator {
    const productLocator = this.getProductLocator(productName);
    return productLocator.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
  }

  private getRemoveButtonLocator(productName: string): Locator {
    const productLocator = this.getProductLocator(productName);
    return productLocator.locator('[data-test="remove-sauce-labs-backpack"]');
  }

  async addSauceLabsBackpackToCart(): Promise<void> {
    const addToCartButton = this.getAddToCartButtonLocator(Constants.SAUCE_LABS_BACKPACK);
    await this.clickElement(addToCartButton);
  }

  async removeSauceLabsBackpackFromCart(): Promise<void> {
    const removeButton = this.getRemoveButtonLocator(Constants.SAUCE_LABS_BACKPACK);
    await this.clickElement(removeButton);
  }

  async getCartItemCount(): Promise<number> {
    try {
      const badgeText = await this.getElementText(this.shoppingCartBadge);
      return parseInt(badgeText) || 0;
    } catch {
      return 0;
    }
  }

  async verifyCartItemCount(expectedCount: number): Promise<void> {
    if (expectedCount > 0) {
      await this.verifyElementVisible(this.shoppingCartBadge);
      await this.verifyElementText(this.shoppingCartBadge, expectedCount.toString());
    }
  }

  async verifyProductVisible(productName: string): Promise<void> {
    const productLocator = this.getProductLocator(productName);
    await this.verifyElementVisible(productLocator);
  }

  async verifyAddToCartButtonVisible(productName: string): Promise<void> {
    const addToCartButton = this.getAddToCartButtonLocator(productName);
    await this.verifyElementVisible(addToCartButton);
  }

  async verifyRemoveButtonVisible(productName: string): Promise<void> {
    const removeButton = this.getRemoveButtonLocator(productName);
    await this.verifyElementVisible(removeButton);
  }
}
