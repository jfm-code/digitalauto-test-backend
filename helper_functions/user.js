const { startProxy } = require('../helper_functions/proxy');
const infoConfig = require('./info_config');

async function list_users() {
    const { fetch, agent } = await startProxy();
    let number = 2;
    const response = await fetch(`https://backend-core-dev.digital.auto/v2/users?page=${number}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        timeout: 5000,
        agent: agent
    });
    const data = await response.json();
    console.log('Response status:', response.status);
    console.log('Response data:', data);
}

list_users();