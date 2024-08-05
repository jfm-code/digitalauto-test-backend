const fs = require('fs');
const path = require('path');

function getConfig() {
    const filePath = path.join(__dirname, '../info.json');
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        const config = JSON.parse(data);
        return config;
    } catch (error) {
        console.error('Error reading or parsing info.json:', error);
        throw error;
    }
}

const infoConfig = getConfig();

module.exports = infoConfig;
