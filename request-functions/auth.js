const { startProxy } = require('../helper-functions/proxy');
const infoConfig = require('../info');

async function login(email, password) {
    const proxyConfig = await startProxy();
    const fetch = proxyConfig.fetch;
    const agent = proxyConfig.agent;

    const fetchOptions = {
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
        timeout: 5000
    };
    if (agent) { fetchOptions.agent = agent; }

    const response = await fetch(infoConfig["login_url"], fetchOptions);
    try {
        const data = await response.json();
        return { status: response.status, data: data };
    } catch {
        return { status: response.status, data: null };
    }
}

async function forgotPassword(email) {
    const proxyConfig = await startProxy();
    const fetch = proxyConfig.fetch;
    const agent = proxyConfig.agent;

    const fetchOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email}),
        timeout: 5000,
    };
    if (agent) { fetchOptions.agent = agent; }

    const response = await fetch(infoConfig["forgot_pwd_url"], fetchOptions);
    try {
        const data = await response.json();
        return { status: response.status, data: data };
    } catch {
        return { status: response.status, data: null };
    }
}

async function register(email, password, name) {
    const proxyConfig = await startProxy();
    const fetch = proxyConfig.fetch;
    const agent = proxyConfig.agent;

    const fetchOptions = {
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
    };
    if (agent) { fetchOptions.agent = agent; }

    const response = await fetch(infoConfig["register_url"], fetchOptions);
    try {
        const data = await response.json();
        return { status: response.status, data: data };
    } catch {
        return { status: response.status, data: null };
    }
}

module.exports = { login, forgotPassword, register };