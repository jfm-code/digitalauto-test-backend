const fs = require('fs');
const path = require('path');
const { format: dateFormat } = require('date-fns');

const logDir = path.join(__dirname, '../logs');
const timestamp = dateFormat(new Date(), 'yyyy-MM-dd HH.mm.ss'); // custom date format here
const logFile = path.join(logDir, `${timestamp}.log`);

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Set the log level (ignore the lower levels)
const levels = { DEBUG: 0, INFO: 1, WARN: 2, ERROR: 3, CRITICAL: 4 };
let currentLogLevel = levels.INFO;

function log(level, message) {
  if (levels[level] >= currentLogLevel) {
    const logMessage = `${dateFormat(new Date(), 'yyyy-MM-dd HH.mm.ss')}: ${level}: ${message}\n`;
    fs.appendFileSync(logFile, logMessage, 'utf8');
  }
}

function special_log(message) {
  const logMessage = `${message}\n`;
  fs.appendFileSync(logFile, logMessage, 'utf8');
}

// Export log functions
module.exports = {
  start_end: (message) => special_log(message),
  debug: (message) => log('DEBUG', message),
  info: (message) => log('INFO', message),
  warn: (message) => log('WARN', message),
  error: (message) => log('ERROR', message),
  critical: (message) => log('CRITICAL', message),
  setLogLevel: (level) => {
    if (levels[level] !== undefined) {
      currentLogLevel = levels[level];
    } else {
      throw new Error(`Invalid log level: ${level}`);
    }
  },
  logFile
};
