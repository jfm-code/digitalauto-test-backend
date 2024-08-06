const fs = require('fs');

function writeSummary(logger) {
    const logData = fs.readFileSync(logger.logFile, 'utf8');
    const failedTestCount = (logData.match(/Failure/g) || []).length;
    const totalTestCount = (logData.match(/(Failure|Success). Test/g) || []).length;

    const summary = `------------------------------------------------------------------------------------
SUMMARY:
Number of FAILED test cases: ${failedTestCount} / ${totalTestCount}
${failedTestCount > 0 ? `List of failed test cases:` : ''}
\t${logData.match(/Failure. Test (.*) failed./g)?.map(line => line.replace('Failure. ', '').replace(' failed.', '')).join('\n\t\t') || ''}
`;
    fs.appendFileSync(logger.logFile, summary);
}
module.exports = { writeSummary };