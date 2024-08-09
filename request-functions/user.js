const { startProxy } = require('../helper-functions/proxy');
const infoConfig = require('../info');

async function listUsers(page_number) {
    const proxyConfig = await startProxy();
    const fetch = proxyConfig.fetch;
    const agent = proxyConfig.agent;

    const fetchOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        timeout: 5000,
    };
    if (agent) { fetchOptions.agent = agent; }

    const response = await fetch(`${infoConfig["user_url"]}?page=${page_number}`, fetchOptions);
    try {
        const data = await response.json();
        return { status: response.status, data: data };
    } catch (error) {
        return { status: response.status, data: null };
    }
}

async function getUser(id) {
    const proxyConfig = await startProxy();
    const fetch = proxyConfig.fetch;
    const agent = proxyConfig.agent;

    const fetchOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        timeout: 5000,
    };
    if (agent) { fetchOptions.agent = agent; }

    const response = await fetch(`${infoConfig["user_url"]}/${id}`, fetchOptions);
    try {
        const data = await response.json();
        return { status: response.status, data: data };
    } catch (error) {
        return { status: response.status, data: null };
    }
}

async function createUser(email, password, name, token) {
    const proxyConfig = await startProxy();
    const fetch = proxyConfig.fetch;
    const agent = proxyConfig.agent;

    const fetchOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
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

    const response = await fetch(infoConfig["user_url"], fetchOptions);
    try {
        const data = await response.json();
        return { status: response.status, data: data };
    } catch (error) {
        return { status: response.status, data: null };
    }
}

async function updateUser(new_password, token, id) {
    const proxyConfig = await startProxy();
    const fetch = proxyConfig.fetch;
    const agent = proxyConfig.agent;    
    
    const fetchOptions = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({password: new_password,}),
        timeout: 5000,
    };
    if (agent) { fetchOptions.agent = agent; }

    const response = await fetch(`${infoConfig["user_url"]}/${id}`, fetchOptions);
    try {
        const data = await response.json();
        return { status: response.status, data: data };
    } catch (error) {
        return { status: response.status, data: null };
    }
}

async function deleteUser(token, id) {
    const proxyConfig = await startProxy();
    const fetch = proxyConfig.fetch;
    const agent = proxyConfig.agent;

    const fetchOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        timeout: 5000,
    };
    if (agent) { fetchOptions.agent = agent; }

    const response = await fetch(`${infoConfig["user_url"]}/${id}`, fetchOptions);
    try {
        const data = await response.json();
        return { status: response.status, data: data };
    } catch {
        return { status: response.status, data: null };
    }
}

async function selfPromote(token) {
    const proxyConfig = await startProxy();
    const fetch = proxyConfig.fetch;
    const agent = proxyConfig.agent;

    const fetchOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        timeout: 5000,
    };
    if (agent) { fetchOptions.agent = agent; }
    
    const response = await fetch(`${infoConfig["self_url"]}/promote`, fetchOptions);
    try {
        const data = await response.json();
        return { status: response.status, data: data };
    } catch (error) {
        return { status: response.status, data: null };
    }
}

async function getSelf(token) {
    const proxyConfig = await startProxy();
    const fetch = proxyConfig.fetch;
    const agent = proxyConfig.agent;

    const fetchOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        timeout: 5000,
    };
    if (agent) { fetchOptions.agent = agent; }

    const response = await fetch(infoConfig["self_url"], fetchOptions);
    try {
        const data = await response.json();
        return { status: response.status, data: data };
    } catch (error) {
        return { status: response.status, data: null };
    }
}

async function updateSelf(new_password, token) {
    const proxyConfig = await startProxy();
    const fetch = proxyConfig.fetch;
    const agent = proxyConfig.agent;

    const fetchOptions = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({password: new_password,}),
        timeout: 5000,
    };
    if (agent) { fetchOptions.agent = agent; }

    const response = await fetch(infoConfig["self_url"], fetchOptions);
    try {
        const data = await response.json();
        return { status: response.status, data: data };
    } catch (error) {
        return { status: response.status, data: null };
    }
}

module.exports = { listUsers, getUser, updateUser, deleteUser, selfPromote, getSelf, createUser, updateSelf }