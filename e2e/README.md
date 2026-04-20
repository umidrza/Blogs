# E2E Tests

End-to-end tests for the Blogs application using Playwright.

## Features

- Automated browser testing
- Tests for user authentication
- Blog creation and interaction
- Cross-browser support (Chromium, Firefox)

## Technologies

- Playwright
- Node.js

## Installation

1. Navigate to the e2e directory:
   ```bash
   cd e2e
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Ensure the backend and frontend are running:
   - Backend on port 3003
   - Frontend on port 5173

## Running Tests

Run all tests:
```bash
npm test
```

View test report:
```bash
npm run test:report
```

## Configuration

Tests are configured in `playwright.config.js`:
- Base URL: http://localhost:5173
- Browsers: Chromium and Firefox
- Timeout: 3000ms

## Test Structure

- `tests/blog_app.spec.js` - Main test suite
- `tests/helper.js` - Test utilities

## Recommendations

- Add more test scenarios, such as user registration, blog editing, and commenting.
- Implement visual regression testing with Playwright's screenshot capabilities.
- Add tests for mobile devices and different screen sizes.
- Integrate with CI/CD pipeline for automated testing.
- Add performance testing to monitor page load times.
- Ensure tests are isolated and don't depend on external state.
- Add API mocking for faster and more reliable tests.</content>
<parameter name="filePath">c:\Users\umidr\full-stack-open\Blogs\e2e\README.md