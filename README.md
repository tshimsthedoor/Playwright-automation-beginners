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

Execute the tests using Playwright:

```bash
# Run all tests
npx playwright test

# Run tests in headed mode (see browser)
npx playwright test --headed

# Run tests with UI mode (interactive)
npx playwright test --ui

# Run specific test file
npx playwright test UIBasicstest.spec.js

# Debug tests
npx playwright test --debug
```

## Test Cases

### Test 1: Browser Context Playwright Test
- **Purpose**: Demonstrates browser context creation and page navigation
- **Steps**:
  1. Creates a new browser context
  2. Creates a new page within the context
  3. Navigates to the Rahul Shetty Academy login practice page
  4. Verifies the page title is "LoginPage Practise | Rahul Shetty Academy"

### Test 2: Page Playwright Test
- **Purpose**: Demonstrates page navigation and various assertion methods
- **Steps**:
  1. Navigates to Google.com
  2. Retrieves and logs the page title
  3. Verifies title equals "Google" 
  4. Verifies URL contains "google"
  5. Verifies URL matches regex pattern `/google/`
  6. Uses Playwright's built-in assertion for title

## Configuration Details

The `playwright.config.js` file contains:

| Setting | Value | Purpose |
|---------|-------|---------|
| testDir | `./tests` | Directory containing test files |
| timeout | 40 seconds | Maximum time per test |
| expect.timeout | 40 seconds | Maximum time for assertions |
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
