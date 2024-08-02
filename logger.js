const fs = require('fs');
const path = require('path');
const { format: dateFormat } = require('date-fns');

// Log directory and file
const logDir = path.join(__dirname, 'logs');
const timestamp = dateFormat(new Date(), 'yyyy-MM-dd HH.mm.ss'); // custom date format here
const logFile = path.join(logDir, `${timestamp}.log`);

// Ensure the log directory exists
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Function to write log messages to the file
function normal_log(level, message) {
  const logMessage = `${timestamp}: ${level}: ${message}\n`;
  fs.appendFileSync(logFile, logMessage, 'utf8');
}

function special_log(message) {
    const logMessage = `${message}\n`;
    fs.appendFileSync(logFile, logMessage, 'utf8');
}

// Export log functions
module.exports = {
  start_end: (message) => special_log(message),
  info: (message) => normal_log('INFO', message),
  warn: (message) => normal_log('WARN', message),
  error: (message) => normal_log('ERROR', message),
  critical: (message) => normal_log('CRITICAL', message),
  logFile
};
