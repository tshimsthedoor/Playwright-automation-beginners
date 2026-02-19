// @ts-check
import { defineConfig, devices } from '@playwright/test';



/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  timeout: 50 * 1000,
  expect: {
    timeout: 50 * 1000
  },
  reporter: [['list'], ['html']],
  
  use: {
    browserName: 'webkit',
    // Always run headless in containers and CI, headed only locally when explicitly set
     //headless: !process.env.HEADED,
    headless: process.env.CI ? true : !process.env.HEADED,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    
  },
  

  
});

module.exports = config;

