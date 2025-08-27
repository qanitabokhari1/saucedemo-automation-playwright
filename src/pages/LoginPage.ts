import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Constants } from '../utils/Constants';

export class LoginPage extends BasePage {
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;
  private readonly loginLogo: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.loginLogo = page.locator('.login_logo');
  }

  async navigate(): Promise<void> {
    await this.navigateTo(Constants.LOGIN_URL);
    await this.waitForPageLoad();
  }

  async verifyLoginPageLoaded(): Promise<void> {
    await this.verifyElementVisible(this.loginLogo);
    await this.verifyElementVisible(this.usernameInput);
    await this.verifyElementVisible(this.passwordInput);
    await this.verifyElementVisible(this.loginButton);
  }

  async enterUsername(username: string): Promise<void> {
    await this.fillInput(this.usernameInput, username);
  }

  async enterPassword(password: string): Promise<void> {
    await this.fillInput(this.passwordInput, password);
  }

  async clickLoginButton(): Promise<void> {
    await this.clickElement(this.loginButton);
  }

  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  async loginWithValidCredentials(): Promise<void> {
    await this.login(Constants.VALID_USERNAME, Constants.VALID_PASSWORD);
  }

  async verifyErrorMessage(expectedMessage: string): Promise<void> {
    await this.verifyElementVisible(this.errorMessage);
    await this.verifyElementText(this.errorMessage, expectedMessage);
  }

  async verifySuccessfulLogin(): Promise<void> {
    await this.verifyCurrentUrl(Constants.INVENTORY_URL);
  }
}
