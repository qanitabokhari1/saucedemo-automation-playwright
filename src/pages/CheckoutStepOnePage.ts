import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Constants } from '../utils/Constants';
import { TestData } from '../utils/TestData';

export class CheckoutStepOnePage extends BasePage {
  private readonly pageTitle: Locator;
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly zipCodeInput: Locator;
  private readonly continueButton: Locator;
  private readonly cancelButton: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator('.title');
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.zipCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async verifyPageLoaded(): Promise<void> {
    await this.verifyElementVisible(this.pageTitle);
    await this.verifyElementText(this.pageTitle, 'Checkout: Your Information');
    await this.verifyCurrentUrl(Constants.CHECKOUT_STEP_ONE_URL);
    await this.verifyFormFieldsVisible();
  }

  private async verifyFormFieldsVisible(): Promise<void> {
    await this.verifyElementVisible(this.firstNameInput);
    await this.verifyElementVisible(this.lastNameInput);
    await this.verifyElementVisible(this.zipCodeInput);
    await this.verifyElementVisible(this.continueButton);
    await this.verifyElementVisible(this.cancelButton);
  }

  async fillFirstName(firstName: string): Promise<void> {
    await this.fillInput(this.firstNameInput, firstName);
  }

  async fillLastName(lastName: string): Promise<void> {
    await this.fillInput(this.lastNameInput, lastName);
  }

  async fillZipCode(zipCode: string): Promise<void> {
    await this.fillInput(this.zipCodeInput, zipCode);
  }

  async fillCustomerInformation(firstName: string, lastName: string, zipCode: string): Promise<void> {
    await this.fillFirstName(firstName);
    await this.fillLastName(lastName);
    await this.fillZipCode(zipCode);
  }

  async fillRandomCustomerInformation(): Promise<{firstName: string, lastName: string, zipCode: string}> {
    const customerData = TestData.generateCustomerData();
    await this.fillCustomerInformation(
      customerData.firstName,
      customerData.lastName,
      customerData.zipCode
    );
    return customerData;
  }

  async clickContinue(): Promise<void> {
    await this.verifyElementVisible(this.continueButton);
    await this.clickElement(this.continueButton);
  }

  async clickCancel(): Promise<void> {
    await this.clickElement(this.cancelButton);
  }

  async completeStepOneWithRandomData(): Promise<{firstName: string, lastName: string, zipCode: string}> {
    const customerData = await this.fillRandomCustomerInformation();
    await this.clickContinue();
    return customerData;
  }

  async verifyErrorMessage(expectedMessage: string): Promise<void> {
    await this.verifyElementVisible(this.errorMessage);
    await this.verifyElementText(this.errorMessage, expectedMessage);
  }

  async getFirstNameValue(): Promise<string> {
    return await this.firstNameInput.inputValue();
  }

  async getLastNameValue(): Promise<string> {
    return await this.lastNameInput.inputValue();
  }

  async getZipCodeValue(): Promise<string> {
    return await this.zipCodeInput.inputValue();
  }

  async clearAllFields(): Promise<void> {
    await this.firstNameInput.clear();
    await this.lastNameInput.clear();
    await this.zipCodeInput.clear();
  }

  async verifyAllFieldsFilled(): Promise<void> {
    const firstName = await this.getFirstNameValue();
    const lastName = await this.getLastNameValue();
    const zipCode = await this.getZipCodeValue();

    if (!firstName || !lastName || !zipCode) {
      throw new Error('Not all required fields are filled');
    }
  }
}
