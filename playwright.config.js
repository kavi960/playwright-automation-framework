require('dotenv').config();

const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({

    // Location of test files
    testDir: './tests',

    // Maximum time for each test
    timeout: 30 * 1000,

    // Assertion timeout
    expect: {
        timeout: 5 * 1000
    },

    // Run tests in parallel
    fullyParallel: true,

    // Prevent accidental test.only from being pushed to CI
    forbidOnly: !!process.env.CI,

    // Retry failed tests in CI
    retries: process.env.CI ? 2 : 0,

    // Number of workers
    workers: process.env.CI ? 1 : undefined,

    // Reporter
    reporter: [
        ['html', { open: 'on-failure' }],
        ['list']
    ],

    // Common settings for every browser
    use: {

        // Application URL
        baseURL: process.env.BASE_URL,

        viewport: null,

        launchOptions: {
            args: ['--start-maximized']
        },

        // Collect trace when test retries
        trace: 'only-on-failure',

        // Screenshot when test fails
        screenshot: 'only-on-failure',

        // Record video when test fails
        video: 'retain-on-failure',

        // Browser runs headless by default
        headless: true
    },

    // Browsers
    projects: [

        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome']
            }
        },

        {
            name: 'firefox',
            use: {
                ...devices['Desktop Firefox']
            }
        },

        {
            name: 'webkit',
            use: {
                ...devices['Desktop Safari']
            }
        }
    ]
});