const { sum } = require('../test_functions/calculate');
const logger = require('../logger');
const fs = require('fs');
const path = require('path');

beforeAll(() => {
  logger.start_end('Start testing bla methods');
});

afterAll(() => {
  logger.start_end('Finish testing bla methods');

  // Read the log file and write the summary
  const logData = fs.readFileSync(logger.logFile, 'utf8');

  // Count the number of failed test cases
  const failedTestCount = (logData.match(/Failure/g) || []).length;
  const totalTestCount = (logData.match(/(Failure|Success). Test/g) || []).length;

  // Create the summary
  const summary = `------------------------------------------------------------------------------------
SUMMARY:
\tNumber of FAILED test cases: ${failedTestCount} / ${totalTestCount}
\t${failedTestCount > 0 ? `List of failed test cases:` : ''}
\t\t${logData.match(/Failure. Test (.*) failed./g)?.map(line => line.replace('Failure. ', '').replace(' failed.', '')).join('\n\t\t') || ''}
`;

  // Append the summary to the log file
  fs.appendFileSync(logger.logFile, summary);
});

test('Test login', () => {
  try {
    expect(sum(1, 2)).toBe(2);
    logger.info('Success. Test login passed.');
  } catch (error) {
    logger.error('Failure. Test login failed.');
  }
});

test('Test forgot password', () => {
  try {
    expect(sum(2, 2)).toBe(5); // This will fail
    logger.info('Success. Test forgot password passed.');
  } catch (error) {
    logger.error('Failure. Test forgot password failed.');
  }
});
