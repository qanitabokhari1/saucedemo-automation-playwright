import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { ProductsPage } from '../src/pages/ProductsPage';
import { CartPage } from '../src/pages/CartPage';
import { CheckoutStepOnePage } from '../src/pages/CheckoutStepOnePage';
import { CheckoutStepTwoPage } from '../src/pages/CheckoutStepTwoPage';
import { CheckoutCompletePage } from '../src/pages/CheckoutCompletePage';
import { Constants } from '../src/utils/Constants';

test.describe('SauceDemo E-commerce Workflow', () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;
  let cartPage: CartPage;
  let checkoutStepOnePage: CheckoutStepOnePage;
  let checkoutStepTwoPage: CheckoutStepTwoPage;
  let checkoutCompletePage: CheckoutCompletePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    checkoutStepOnePage = new CheckoutStepOnePage(page);
    checkoutStepTwoPage = new CheckoutStepTwoPage(page);
    checkoutCompletePage = new CheckoutCompletePage(page);
  });

  test('Complete SauceDemo e-commerce workflow - Login to Order Completion', async ({ page }) => {
    await test.step('Navigate to SauceDemo website', async () => {
      console.log('Step 1: Navigating to login page...');
      await loginPage.navigate();
      await page.waitForTimeout(2000);
      await loginPage.verifyLoginPageLoaded();
      console.log('Login page loaded successfully');
    });

    await test.step('Login with valid credentials', async () => {
      console.log('Step 2: Attempting login...');
      await loginPage.loginWithValidCredentials();
      await page.waitForTimeout(2000);
      await loginPage.verifySuccessfulLogin();
      console.log('Login successful - Home page loaded');
    });

    await test.step('Add Sauce Labs Backpack to cart', async () => {
      console.log('Step 3: Adding product to cart...');
      await productsPage.verifyProductsPageLoaded();
      await page.waitForTimeout(1000);
      await productsPage.verifyProductVisible(Constants.SAUCE_LABS_BACKPACK);
      await page.waitForTimeout(1000);
      await productsPage.addSauceLabsBackpackToCart();
      await page.waitForTimeout(2000);
      await productsPage.verifyCartItemCount(1);
      await page.waitForTimeout(1000);
      await productsPage.verifyRemoveButtonVisible(Constants.SAUCE_LABS_BACKPACK);
      console.log('Product added to cart successfully');
    });

    await test.step('Navigate to shopping cart', async () => {
      console.log('Step 4: Navigating to cart page...');
      await productsPage.clickShoppingCart();
      await page.waitForTimeout(2000);
      await cartPage.verifyCartPageLoaded();
      await page.waitForTimeout(1000);
      await cartPage.verifySauceLabsBackpackInCart();
      await page.waitForTimeout(1000);
      await cartPage.verifyCartItemCount(1);
      console.log('Cart page loaded with items');
    });

    await test.step('Proceed to checkout', async () => {
      console.log('Step 5: Proceeding to checkout...');
      await cartPage.verifyCheckoutButtonVisible();
      await page.waitForTimeout(1000);
      await cartPage.clickCheckout();
      await page.waitForTimeout(2000);
      await checkoutStepOnePage.verifyPageLoaded();
      console.log('Checkout step 1 loaded');
    });

    await test.step('Fill customer information with random data', async () => {
      console.log('Step 6: Filling customer information...');
      const customerData = await checkoutStepOnePage.fillRandomCustomerInformation();
      await page.waitForTimeout(2000);
      await checkoutStepOnePage.verifyAllFieldsFilled();
      
      console.log('Generated Customer Data:', {
        firstName: customerData.firstName,
        lastName: customerData.lastName,
        zipCode: customerData.zipCode
      });
      console.log('Customer information filled successfully');
      await page.waitForTimeout(1000);
    });

    await test.step('Continue to order review', async () => {
      console.log('Step 7: Reviewing order details...');
      await checkoutStepOnePage.clickContinue();
      await page.waitForTimeout(2000);
      await checkoutStepTwoPage.verifyPageLoaded();
      await page.waitForTimeout(1000);
      await checkoutStepTwoPage.verifySauceLabsBackpackInOrderSummary();
      await page.waitForTimeout(1000);
      await checkoutStepTwoPage.verifyOrderItemCount(1);
      console.log('Order review page loaded');
    });

    await test.step('Complete the order', async () => {
      console.log('Step 8: Completing the order...');
      await checkoutStepTwoPage.verifyOrderSummaryComplete();
      await page.waitForTimeout(1000);
      await checkoutStepTwoPage.clickFinish();
      await page.waitForTimeout(2000);
      await checkoutCompletePage.verifyPageLoaded();
      console.log('Order completion page loaded');
    });

    await test.step('Verify order completion success message', async () => {
      console.log('Step 9: Verifying order completion...');
      await checkoutCompletePage.verifyCompleteOrderSuccess();
      await page.waitForTimeout(1000);
      await checkoutCompletePage.verifySuccessMessage(Constants.ORDER_COMPLETE_MESSAGE);
      await page.waitForTimeout(1000);
      await checkoutCompletePage.verifyThankYouMessage();
      await page.waitForTimeout(1000);
      await checkoutCompletePage.verifyOrderCompleteMessage();
      console.log('Order completed successfully!');
    });

    await test.step('Return to products page', async () => {
      console.log('Step 10: Returning to home page...');
      await checkoutCompletePage.clickBackHome();
      await page.waitForTimeout(2000);
      await productsPage.verifyProductsPageLoaded();
      console.log('Back to home page - Workflow completed!');
    });
  });

  test('Verify login functionality independently', async ({ page }) => {
    console.log('Testing login functionality...');
    await loginPage.navigate();
    await page.waitForTimeout(2000);
    await loginPage.verifyLoginPageLoaded();
    await page.waitForTimeout(1000);
    await loginPage.loginWithValidCredentials();
    await page.waitForTimeout(2000);
    await loginPage.verifySuccessfulLogin();
    await page.waitForTimeout(1000);
    await productsPage.verifyProductsPageLoaded();
    console.log('Login test completed successfully');
  });

  test('Verify product addition to cart independently', async ({ page }) => {
    console.log('Testing product addition to cart...');
    await loginPage.navigate();
    await page.waitForTimeout(2000);
    await loginPage.loginWithValidCredentials();
    await page.waitForTimeout(2000);
    await productsPage.verifyProductsPageLoaded();
    
    await page.waitForTimeout(1000);
    await productsPage.verifyProductVisible(Constants.SAUCE_LABS_BACKPACK);
    await page.waitForTimeout(1000);
    await productsPage.addSauceLabsBackpackToCart();
    await page.waitForTimeout(2000);
    await productsPage.verifyCartItemCount(1);
    await page.waitForTimeout(1000);
    await productsPage.verifyRemoveButtonVisible(Constants.SAUCE_LABS_BACKPACK);
    console.log('Product addition test completed successfully');
  });

  test('Verify cart functionality independently', async ({ page }) => {
    console.log('Testing cart functionality...');
    await loginPage.navigate();
    await page.waitForTimeout(2000);
    await loginPage.loginWithValidCredentials();
    await page.waitForTimeout(2000);
    await productsPage.addSauceLabsBackpackToCart();
    await page.waitForTimeout(2000);
    
    await productsPage.clickShoppingCart();
    await page.waitForTimeout(2000);
    await cartPage.verifyCartPageLoaded();
    await page.waitForTimeout(1000);
    await cartPage.verifySauceLabsBackpackInCart();
    await page.waitForTimeout(1000);
    await cartPage.verifyCartItemCount(1);
    await page.waitForTimeout(1000);
    await cartPage.verifyCheckoutButtonVisible();
    console.log('Cart functionality test completed successfully');
  });

  test('Verify checkout form functionality independently', async ({ page }) => {
    console.log('Testing checkout form functionality...');
    await loginPage.navigate();
    await page.waitForTimeout(2000);
    await loginPage.loginWithValidCredentials();
    await page.waitForTimeout(2000);
    await productsPage.addSauceLabsBackpackToCart();
    await page.waitForTimeout(2000);
    await productsPage.clickShoppingCart();
    await page.waitForTimeout(2000);
    await cartPage.clickCheckout();
    await page.waitForTimeout(2000);
    
    await checkoutStepOnePage.verifyPageLoaded();
    await page.waitForTimeout(1000);
    const customerData = await checkoutStepOnePage.fillRandomCustomerInformation();
    await page.waitForTimeout(2000);
    await checkoutStepOnePage.verifyAllFieldsFilled();
    
    await page.waitForTimeout(1000);
    expect(await checkoutStepOnePage.getFirstNameValue()).toBe(customerData.firstName);
    expect(await checkoutStepOnePage.getLastNameValue()).toBe(customerData.lastName);
    expect(await checkoutStepOnePage.getZipCodeValue()).toBe(customerData.zipCode);
    console.log('Checkout form test completed successfully');
  });

  test('Verify order review functionality independently', async ({ page }) => {
    console.log('Testing order review functionality...');
    await loginPage.navigate();
    await page.waitForTimeout(2000);
    await loginPage.loginWithValidCredentials();
    await page.waitForTimeout(2000);
    await productsPage.addSauceLabsBackpackToCart();
    await page.waitForTimeout(2000);
    await productsPage.clickShoppingCart();
    await page.waitForTimeout(2000);
    await cartPage.clickCheckout();
    await page.waitForTimeout(2000);
    await checkoutStepOnePage.completeStepOneWithRandomData();
    await page.waitForTimeout(2000);
    
    await checkoutStepTwoPage.verifyPageLoaded();
    await page.waitForTimeout(1000);
    await checkoutStepTwoPage.verifySauceLabsBackpackInOrderSummary();
    await page.waitForTimeout(1000);
    await checkoutStepTwoPage.verifyOrderItemCount(1);
    await page.waitForTimeout(1000);
    await checkoutStepTwoPage.verifyOrderSummaryComplete();
    
    await page.waitForTimeout(1000);
    const subtotal = await checkoutStepTwoPage.getSubtotalAmount();
    const tax = await checkoutStepTwoPage.getTaxAmount();
    const total = await checkoutStepTwoPage.getTotalAmount();
    
    expect(subtotal).toBeTruthy();
    expect(tax).toBeTruthy();
    expect(total).toBeTruthy();
    console.log('Order review test completed successfully');
  });

  test('Verify error handling for empty login fields', async ({ page }) => {
    console.log('Testing error handling for empty login fields...');
    await loginPage.navigate();
    await page.waitForTimeout(2000);
    await loginPage.verifyLoginPageLoaded();
    
    await page.waitForTimeout(1000);
    await loginPage.clickLoginButton();
    await page.waitForTimeout(2000);
    await loginPage.verifyErrorMessage(Constants.MISSING_USERNAME_ERROR);
    console.log('Empty login fields error test completed successfully');
  });

  test('Verify error handling for invalid credentials', async ({ page }) => {
    console.log('Testing error handling for invalid credentials...');
    await loginPage.navigate();
    await page.waitForTimeout(2000);
    await loginPage.verifyLoginPageLoaded();
    
    await page.waitForTimeout(1000);
    await loginPage.login('invalid_user', 'invalid_password');
    await page.waitForTimeout(2000);
    await loginPage.verifyErrorMessage(Constants.INVALID_CREDENTIALS_ERROR);
    console.log('Invalid credentials error test completed successfully');
  });

  test('Verify error handling for empty checkout form', async ({ page }) => {
    console.log('Testing error handling for empty checkout form...');
    await loginPage.navigate();
    await page.waitForTimeout(2000);
    await loginPage.loginWithValidCredentials();
    await page.waitForTimeout(2000);
    await productsPage.addSauceLabsBackpackToCart();
    await page.waitForTimeout(2000);
    await productsPage.clickShoppingCart();
    await page.waitForTimeout(2000);
    await cartPage.clickCheckout();
    await page.waitForTimeout(2000);
    await checkoutStepOnePage.verifyPageLoaded();
    
    await page.waitForTimeout(1000);
    await checkoutStepOnePage.clickContinue();
    await page.waitForTimeout(2000);
    await checkoutStepOnePage.verifyErrorMessage('Error: First Name is required');
    console.log('Empty checkout form error test completed successfully');
  });
});
