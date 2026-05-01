const fs = require('fs');
const path = require('path');

// Read Playwright JSON report
const reportPath = 'test-results.json';
if (!fs.existsSync(reportPath)) {
  console.log('No test results found');
  process.exit(0);
}

const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));

// Calculate metrics
const stats = report.stats;
const suites = report.suites || [];

// Flatten all tests to get detailed info
const allTests = [];
function flattenTests(suite) {
  if (suite.tests) {
    allTests.push(...suite.tests);
  }
  if (suite.suites) {
    suite.suites.forEach(flattenTests);
  }
}
suites.forEach(flattenTests);

// Calculate duration for each test
const testDurations = allTests.map(test => {
  const duration = test.totalTime || 0;
  return {
    title: test.title,
    duration,
    status: test.status,
    file: test.file
  };
});

// Sort by duration to find slowest tests
const slowestTests = testDurations
  .sort((a, b) => b.duration - a.duration)
  .slice(0, 5);

// Find flaky tests (tests that sometimes fail)
const testTitles = {};
allTests.forEach(test => {
  if (!testTitles[test.title]) {
    testTitles[test.title] = { passed: 0, failed: 0, skipped: 0 };
  }
  testTitles[test.title][test.status]++;
});

const flakyTests = Object.entries(testTitles)
  .filter(([_, counts]) => counts.failed > 0 && counts.passed > 0)
  .map(([title, counts]) => ({
    title,
    passed: counts.passed || 0,
    failed: counts.failed || 0,
    flakiness: ((counts.failed / (counts.passed + counts.failed)) * 100).toFixed(1)
  }));

// Create metrics object
const metrics = {
  date: new Date().toISOString(),
  timestamp: Date.now(),
  
  // Basic stats
  totalTests: stats.expected,
  passed: stats.expected - stats.unexpected - stats.skipped,
  failed: stats.unexpected,
  skipped: stats.skipped,
  passRate: stats.expected > 0 ? 
    (((stats.expected - stats.unexpected - stats.skipped) / stats.expected) * 100).toFixed(2) : 0,
  
  // Duration info
  totalDuration: stats.duration || 0,
  avgDuration: stats.duration && stats.expected > 0 ? 
    (stats.duration / stats.expected).toFixed(2) : 0,
  
  // Detailed info
  slowestTests,
  flakyTests,
  
  // Environment
  branch: process.env.GITHUB_REF?.replace('refs/heads/', '') || 'unknown',
  commit: process.env.GITHUB_SHA?.substring(0, 7) || 'unknown',
  workflow: process.env.GITHUB_WORKFLOW || 'unknown'
};

console.log('Test Metrics Generated:');
console.log(`  Total Tests: ${metrics.totalTests}`);
console.log(`  Passed: ${metrics.passed}`);
console.log(`  Failed: ${metrics.failed}`);
console.log(`  Skipped: ${metrics.skipped}`);
console.log(`  Pass Rate: ${metrics.passRate}%`);
console.log(`  Duration: ${metrics.totalDuration}ms`);

// Ensure docs directory exists
if (!fs.existsSync('docs')) {
  fs.mkdirSync('docs', { recursive: true });
}

// Read existing dashboard data
const dataFile = 'docs/dashboard-data.json';
let allMetrics = [];
if (fs.existsSync(dataFile)) {
  allMetrics = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
}

// Keep only last 90 days of data
const ninetyDaysAgo = Date.now() - (90 * 24 * 60 * 60 * 1000);
allMetrics = allMetrics.filter(m => m.timestamp > ninetyDaysAgo);

// Add new metrics
allMetrics.push(metrics);

// Sort by date
allMetrics.sort((a, b) => new Date(a.date) - new Date(b.date));

// Save updated data
fs.writeFileSync(dataFile, JSON.stringify(allMetrics, null, 2));

console.log(`\nDashboard data saved (${allMetrics.length} records)`);