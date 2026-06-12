/**
 * Generates a rich dashboard-style HTML report from cucumber JSON.
 * Run:  npm run report   (after a test run)
 * Output: reports/html-report/index.html
 */
const reporter = require('multiple-cucumber-html-reporter');

reporter.generate({
  jsonDir: 'reports',
  reportPath: 'reports/html-report',
  pageTitle: 'BDD Automation Report',
  reportName: 'Playwright + Cucumber BDD Test Report',
  displayDuration: true,
  metadata: {
    browser: { name: process.env.BROWSER || 'chromium', version: 'latest' },
    device: 'Local Machine',
    platform: { name: process.platform, version: '' },
  },
  customData: {
    title: 'Run Info',
    data: [
      { label: 'Project', value: 'Client Automation' },
      { label: 'Execution Date', value: new Date().toLocaleString() },
    ],
  },
});
