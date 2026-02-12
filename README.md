# Playwright UI Basics Test Project

This is a beginner-level Playwright testing project from the Udemy Playwright course. It demonstrates the fundamentals of automated end-to-end (E2E) testing using Microsoft's Playwright framework.

## Project Overview

The project contains automated tests for web UI interactions and assertions. The tests verify:
- Page navigation and URL matching
- Page titles and assertions
- Browser context and page object handling
- Different assertion methods in Playwright

## Tech Stack

- **Testing Framework**: Playwright v1.58.2
- **Runtime**: Node.js (CommonJS)
- **Browser Engine**: WebKit
- **Test Reporter**: HTML (visual test reports)

## Project Structure

```
first-test/
├── tests/
│   └── UIBasicstest.spec.js      # Contains all test cases
├── playwright.config.js           # Playwright configuration
├── package.json                   # Project dependencies
├── playwright-report/            # Generated HTML test reports
└── test-results/                 # Test result artifacts
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone or download the project
2. Navigate to the project directory:
   ```bash
   cd first-test
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Running Tests

### Local Execution

Execute the tests using Playwright:

```bash
# Run all tests
npm test

# Run tests in headed mode (see browser in action)
npx playwright test --headed

# Run tests with UI mode (interactive dashboard)
npx playwright test --ui

# Run specific test by pattern
npx playwright test --grep "case sensitive"

# Debug tests (step through code)
npx playwright test --debug
```

### Docker Execution

Run tests in a containerized environment for consistent results across all machines:

```bash
# Build image and run tests
docker-compose up --build

# Run tests only (image already built)
docker-compose up

# Stop containers
docker-compose down
```

**Benefits of Docker:**
- Guaranteed same environment everywhere
- No dependency on local Node.js/browser versions
- Perfect for CI/CD pipelines
- Eliminates "works on my machine" problems

## Test Cases

### Comprehensive Login Test Suite (23 Tests)

The test suite covers real-world login scenarios with thorough validation:

#### ✅ **Valid Credentials** (3 tests)
- Login with valid credentials shows no error
- Successful login displays course content
- First course name is displayed on dashboard

#### ❌ **Invalid Credentials** (3 tests)
- Wrong username displays error message
- Wrong password displays error message
- Both credentials wrong displays error

#### ⚠️ **Empty Fields** (2 tests)
- Empty username fails with error
- Empty password fails with error

#### 🔐 **Security & Case Sensitivity** (2 tests)
- Username is case-sensitive
- Password is case-sensitive

#### 📝 **Form Elements Visibility** (3 tests)
- Username input field is visible
- Password input field is visible
- Sign in button is visible

#### ⌨️ **User Interactions** (4 tests)
- Can type in username field
- Can type in password field
- Can clear username field
- Can clear password field

#### 🔤 **Edge Cases & Input** (3 tests)
- Handles very long username (100 characters)
- Rejects numeric-only username
- Rejects numeric-only password

#### 📄 **Page Verification** (1 test)
- Page title matches expected value

#### 🔄 **Session Management** (2 tests)
- Multiple failed attempts allow subsequent login
- First course name is displayed after login

#### 🌐 **Navigation** (2 tests)
- Successfully navigates to login page
- Google homepage has correct title

**Total: 23 Passing Tests** ✅

## Configuration Details

The `playwright.config.js` file contains:

| Setting | Value | Purpose |
|---------|-------|---------|
| testDir | `./tests` | Directory containing test files |
| timeout | 40 seconds | Maximum time per test |
| expect.timeout | 40 seconds | Maximum time for assertions |

## Best Practices Used

### ✅ Code Quality
- **Helper Functions**: `login()` reduces duplication
- **Constants**: Centralized test data at top of file
- **DRY Principle**: `beforeEach()` for common setup
- **Meaningful Names**: Test names clearly describe what they verify
- **Clear Organization**: Tests grouped by functionality

### ✅ Testing Strategy
- **Positive Testing**: Valid credentials work correctly
- **Negative Testing**: Invalid inputs properly rejected
- **Boundary Testing**: Edge cases like long inputs
- **State Testing**: Session management scenarios
- **UI Testing**: Element visibility and interaction

### ✅ Assertions Used
- `.toHaveCount(0)` - Element count verification
- `.toContainText()` - Text content validation
- `.toBeVisible()` - Element visibility check
- `.toHaveTitle()` - Page title assertion
- `.inputValue()` - Field value verification

## Adding New Tests

To add a new login scenario test:

```javascript
test('🔍 Your test description', async ({ page }) => {
    // 1. Setup
    await login(page, VALID_USER, VALID_PASS);
    
    // 2. Action (if needed)
    // await page.locator('#element').click();
    
    // 3. Assert
    // await expect(page.locator('#expected')).toBeVisible();
});
```

**Workflow:**
1. Write test locally: `npm test -- --ui`
2. Debug if needed: `npm test -- --debug`
3. Verify in Docker: `docker-compose up`
4. Commit and push
| reporter | html | Generates HTML test reports |
| browserName | webkit | Uses WebKit (Safari engine) |
| headless | false | Show browser window during tests |
| screenshot | on | Capture screenshots on failure |
| video | on | Record video of test execution |
| trace | on | Record trace for debugging |

## Key Learning Points

1. **Browser Context**: Creating isolated browser contexts for testing
2. **Page Navigation**: Using `page.goto()` to navigate to URLs
3. **Assertions**: Different ways to assert page properties:
   - Exact match: `expect().toBe()`
   - Partial match: `expect().toContain()`
   - Pattern match: `expect().toMatch(regex)`
   - Playwright assertions: `expect(page).toHaveTitle()`
4. **Test Reporting**: HTML reports with detailed test execution information

## Generated Artifacts

After running tests, the following are generated:

- **playwright-report/**: Beautiful HTML test report with detailed results
- **test-results/**: Test artifacts including videos, screenshots, and traces
- These help debug failures and review test execution

## Debugging

Playwright provides multiple debugging options:

```bash
# Run with Playwright Inspector
npx playwright test --debug

# View test report
npx playwright show-report

# Run with trace viewer
npx playwright test --trace=on
```

## Next Steps for Learning

- Add more test cases (form filling, clicking elements, etc.)
- Learn about selectors (CSS, XPath, text, etc.)
- Practice with different assertion methods
- Explore fixtures for reusable test setup
- Learn about parallel test execution
- Practice with multiple browsers (Chromium, Firefox)

## Feature Branch: form-validation

- **Branch name:** `feature/form-validation`
- **Create branch locally:**
   ```bash
   git checkout -b feature/form-validation
   ```
- **Push branch to remote:**
   ```bash
   git push -u origin feature/form-validation
   ```

This branch is intended for adding automated tests that verify form validation behavior (required fields, invalid input handling, error messages, and successful submissions).

Suggested test file: `tests/formValidation.spec.js`

Suggested test cases:
- Required fields show validation messages when left empty
- Invalid email formats show appropriate error
- Password strength / validation rules are enforced
- Successful submission with valid input shows success message or redirect
- Accessibility checks for form controls and error announcements

Quick test skeleton to get started:

```javascript
import { test, expect } from '@playwright/test';

test.describe('Form validation', () => {
   test.beforeEach(async ({ page }) => {
      await page.goto('https://example.com/form');
   });

   test('shows required field errors', async ({ page }) => {
      await page.click('button[type="submit"]');
      await expect(page.locator('.error')).toHaveCount(1);
   });
});
```

Tips:
- Use `page.locator()` with clear selectors for stable tests.
- Reuse `beforeEach` to navigate to the form and set up state.
- Capture screenshots, video, and trace on failures (config already enables these).
- Create small, focused tests for each validation rule.


## Resources

- [Playwright Official Documentation](https://playwright.dev)
- [Rahul Shetty Academy](https://rahulshettyacademy.com)
- [Playwright GitHub Repository](https://github.com/microsoft/playwright)

## Notes

- This project uses WebKit browser; you can modify the config to use Chromium or Firefox
- Headless mode is disabled for better visibility during learning
- Videos and traces are recorded for debugging purposes (uses more disk space)

---

Happy testing! 🎭
