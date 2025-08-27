# Sauce Demo Automation Framework

A comprehensive end-to-end test automation framework built with Playwright and TypeScript for testing the Sauce Demo e-commerce website (https://www.saucedemo.com).

## 🚀 Project Overview

This automation framework demonstrates a complete e-commerce workflow testing scenario, covering user authentication, product browsing, shopping cart management, checkout process, and order completion. The framework is built using modern testing practices and follows the Page Object Model (POM) design pattern.

## 🏗️ Architecture

### Project Structure
```
saucedemo-automation/
├── src/
│   ├── pages/           # Page Object classes
│   │   ├── BasePage.ts  # Abstract base class for common functionality
│   │   ├── LoginPage.ts # Login page interactions
│   │   ├── ProductsPage.ts # Products listing and cart management
│   │   ├── CartPage.ts  # Shopping cart operations
│   │   ├── CheckoutStepOnePage.ts # Customer information form
│   │   ├── CheckoutStepTwoPage.ts # Order review and confirmation
│   │   └── CheckoutCompletePage.ts # Order completion confirmation
│   └── utils/           # Utility classes
│       ├── Constants.ts # Application constants and URLs
│       └── TestData.ts  # Test data generation utilities
├── tests/               # Test specifications
│   └── saucedemo.spec.ts # Main test suite
├── playwright.config.ts # Playwright configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Project dependencies and scripts
```

### Design Patterns

#### 1. Page Object Model (POM)
- **BasePage**: Abstract class providing common functionality for all page objects
- **Page Objects**: Separate classes for each application page with encapsulated locators and methods
- **Separation of Concerns**: Test logic separated from page interaction logic

#### 2. Test Data Management
- **Constants**: Centralized storage for URLs, credentials, and expected messages
- **TestData**: Utility class for generating random test data (names, zip codes)

#### 3. Test Organization
- **Test Steps**: Logical grouping of test actions using `test.step()`
- **Independent Tests**: Individual test scenarios for specific functionality
- **Reusable Components**: Common test flows that can be executed independently

## 🛠️ Technology Stack

- **Playwright**: Modern web automation framework
- **TypeScript**: Type-safe JavaScript for better development experience
- **Node.js**: JavaScript runtime environment
- **ESLint**: Code quality and consistency tool

### Dependencies
```json
{
  "devDependencies": {
    "@playwright/test": "^1.52.0",
    "@typescript-eslint/eslint-plugin": "^8.33.0",
    "@typescript-eslint/parser": "^8.33.0",
    "eslint": "^9.28.0",
    "typescript": "^5.8.3"
  },
  "dependencies": {
    "@types/node": "^22.15.29"
  }
}
```

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- Git

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd saucedemo-automation
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Install Playwright Browsers
```bash
npm run test:install
```

### 4. Verify Installation
```bash
npm test
```

## ⚙️ Configuration

### Playwright Configuration (`playwright.config.ts`)

The framework is configured with the following settings:

- **Base URL**: https://www.saucedemo.com
- **Browser**: Chromium (headless: false for debugging)
- **Viewport**: Maximized window
- **Timeouts**: 
  - Action timeout: 30 seconds
  - Navigation timeout: 30 seconds
  - Test timeout: 120 seconds
- **Reporting**: HTML, JUnit XML, and console output
- **Screenshots & Videos**: Captured on test failures
- **Parallel Execution**: Disabled (workers: 1) for stability

### TypeScript Configuration (`tsconfig.json`)

- **Target**: ES2020
- **Module System**: CommonJS
- **Strict Mode**: Enabled
- **Output Directory**: ./dist
- **Type Definitions**: Node.js and Playwright

## 🧪 Test Scenarios

### 1. Complete E-commerce Workflow
**Test**: `Complete SauceDemo e-commerce workflow - Login to Order Completion`

This comprehensive test covers the entire user journey:
1. **Navigation**: Access the Sauce Demo website
2. **Authentication**: Login with valid credentials
3. **Product Selection**: Add "Sauce Labs Backpack" to cart
4. **Cart Management**: Navigate to shopping cart and verify items
5. **Checkout Process**: Proceed through checkout steps
6. **Customer Information**: Fill form with randomly generated data
7. **Order Review**: Verify order summary and pricing
8. **Order Completion**: Complete purchase and verify success
9. **Navigation**: Return to products page

### 2. Independent Functionality Tests

#### Login Functionality
- Valid credential authentication
- Error handling for empty fields
- Error handling for invalid credentials

#### Product Management
- Product visibility verification
- Add to cart functionality
- Cart item count validation

#### Shopping Cart
- Cart page navigation
- Item verification in cart
- Checkout button availability

#### Checkout Process
- Form validation
- Random data generation
- Field value verification

#### Order Management
- Order summary verification
- Pricing calculation validation
- Order completion confirmation

## 🔧 Available Scripts

```bash
# Run all tests
npm test

# Run tests in headed mode (visible browser)
npm run test:headed

# Run tests in debug mode
npm run test:debug

# Open Playwright UI for test execution
npm run test:ui

# Show test report
npm run test:report

# Generate test code using Playwright Codegen
npm run test:codegen

# Install Playwright browsers
npm run test:install
```

## 📊 Test Reporting

The framework generates comprehensive test reports:

- **HTML Report**: Interactive report with test results, screenshots, and videos
- **JUnit XML**: CI/CD integration compatible report
- **Console Output**: Real-time test execution logs
- **Test Results**: Stored in `test-results/` directory

### Viewing Reports
```bash
# Open HTML report
npm run test:report

# View test results directory
ls test-results/
```

## 🏗️ Page Object Classes

### BasePage
Abstract base class providing common functionality:
- Navigation methods
- Element interaction utilities
- Wait strategies
- Verification helpers

### LoginPage
Handles authentication functionality:
- Username/password input
- Login button interaction
- Error message verification
- Page load validation

### ProductsPage
Manages product-related operations:
- Product visibility verification
- Add to cart functionality
- Shopping cart navigation
- Cart item count validation

### CartPage
Shopping cart operations:
- Cart page verification
- Item validation
- Checkout navigation
- Cart state management

### CheckoutStepOnePage
Customer information form:
- Form field population
- Random data generation
- Field validation
- Form submission

### CheckoutStepTwoPage
Order review and confirmation:
- Order summary verification
- Pricing validation
- Order completion
- Navigation controls

### CheckoutCompletePage
Order completion confirmation:
- Success message verification
- Order status validation
- Return navigation

## 🧪 Test Data Management

### Constants
Centralized storage for application constants:
- **URLs**: All application page URLs
- **Credentials**: Valid login credentials
- **Product Names**: Product identifiers
- **Messages**: Expected success/error messages

### TestData
Utility class for generating test data:
- **Names**: Random first and last names
- **Zip Codes**: Random 5-digit zip codes
- **Customer Data**: Complete customer information objects

## 🔍 Locator Strategy

The framework uses Playwright's robust locator strategies:
- **CSS Selectors**: Primary locator method
- **Text Content**: For text-based element identification
- **Role-based**: For accessibility-focused element selection
- **Wait Strategies**: Proper element state waiting

## 🚦 Best Practices Implemented

### 1. Test Stability
- Proper wait strategies for element visibility
- Timeout configurations for different operations
- Retry mechanisms for flaky operations

### 2. Code Organization
- Clear separation of concerns
- Reusable page object methods
- Consistent naming conventions

### 3. Error Handling
- Comprehensive error message verification
- Graceful failure handling
- Detailed logging for debugging

### 4. Test Data Management
- Random data generation for realistic testing
- Centralized constant management
- Reusable test data utilities

## 🐛 Debugging

### Debug Mode
```bash
npm run test:debug
```

### Headed Mode
```bash
npm run test:headed
```

### UI Mode
```bash
npm run test:ui
```

### Console Logging
The framework includes extensive console logging for each test step, making debugging easier.

## 📈 Performance Considerations

- **Parallel Execution**: Currently disabled for stability
- **Timeout Management**: Appropriate timeouts for different operations
- **Resource Management**: Screenshots and videos only on failures
- **Network Optimization**: Wait for network idle state

## 🔒 Security Considerations

- **Credentials**: Stored in constants (consider environment variables for production)
- **Base URL**: Configurable for different environments
- **Test Isolation**: Each test runs independently

## 🚀 Future Enhancements

### Potential Improvements
1. **Parallel Execution**: Enable parallel test execution
2. **Cross-browser Testing**: Add Firefox and Safari support
3. **API Testing**: Integrate API testing capabilities
4. **Visual Testing**: Add visual regression testing
5. **Performance Testing**: Include performance metrics
6. **Mobile Testing**: Add mobile device testing
7. **CI/CD Integration**: GitHub Actions or Jenkins integration

### Environment Support
- **Development**: Local testing environment
- **Staging**: Pre-production environment
- **Production**: Live environment testing

## 🤝 Contributing

### Code Standards
- Follow TypeScript best practices
- Use ESLint for code quality
- Maintain consistent naming conventions
- Add comprehensive comments for complex logic

### Testing Guidelines
- Write independent test scenarios
- Use descriptive test names
- Implement proper error handling
- Maintain test data isolation

## 📚 Additional Resources

- [Playwright Documentation](https://playwright.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Page Object Model Best Practices](https://www.selenium.dev/documentation/test_practices/encouraged/page_object_models/)
- [Test Automation Best Practices](https://martinfowler.com/articles/practical-test-pyramid.html)

## 📞 Support

For questions or issues:
1. Check the test logs and reports
2. Review the console output for debugging information
3. Verify browser compatibility
4. Check network connectivity to the test application

## 📄 License

This project is licensed under the ISC License.

---

**Note**: This framework is designed for educational and demonstration purposes. When using in production environments, ensure proper security measures, environment-specific configurations, and comprehensive error handling.
