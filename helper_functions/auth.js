const { startProxy } = require('../helper_functions/proxy');
const infoConfig = require('./info_config');

async function login(email, password) {
    const { fetch, agent } = await startProxy();
    try {
        const response = await fetch(infoConfig["login_url"], {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    email: email,
                    password: password
                }
            ),
            timeout: 5000,
            agent: agent
        });
        const data = await response.json();
        // console.log('Response status:', response.status);
        // console.log('Response data:', data);
        return { status: response.status, data: data };
    } catch (error) {
        console.error('Error:', error);
    }
}

async function forgot_password(email) {
    const { fetch, agent } = await startProxy();
    const response = await fetch(infoConfig["forgot_pwd_url"], {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email}),
        timeout: 5000,
        agent: agent
    });
    try {
        const data = await response.json();
        return { status: response.status, data: data };
    } catch {
        return { status: response.status, data: null };
    }
}

async function register(email, password, name) {
    const { fetch, agent } = await startProxy();
    try {
        const response = await fetch(infoConfig["register_url"], {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    email: email,
                    password: password,
                    name: name
                }
            ),
            timeout: 5000,
            agent: agent
        });
        const data = await response.json();
        return { status: response.status, data: data };
    } catch (error) {
        console.error('Error:', error);
    }
}

module.exports = { login, forgot_password, register };