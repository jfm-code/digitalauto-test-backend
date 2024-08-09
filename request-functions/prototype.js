const { startProxy } = require('../helper-functions/proxy');
const infoConfig = require('../info');

async function createPrototype(token, model_id, name) {
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
                model_id: model_id,
                name: name
            }
        ),
        timeout: 5000
    };
    if (agent) { fetchOptions.agent = agent; }

    const response = await fetch(infoConfig["prototype_url"], fetchOptions);
    try {
        const data = await response.json();
        return { status: response.status, data: data };
    } catch (error) {
        return { status: response.status, data: null };
    }
}

async function listPrototype() {
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

    const params = 'name,model_id,created_by,id';
    const response = await fetch(`${infoConfig["prototype_url"]}?fields=${params}`, fetchOptions);
    try {
        const data = await response.json();
        return { status: response.status, data: data };
    } catch (error) {
        return { status: response.status, data: null };
    }
}

async function getPrototype(token, prototype_id) {
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

    const response = await fetch(`${infoConfig["prototype_url"]}/${prototype_id}`, fetchOptions);
    try {
        const data = await response.json();
        return { status: response.status, data: data };
    } catch (error) {
        return { status: response.status, data: null };
    }
}

async function updatePrototype(token, prototype_id, name) {
    const proxyConfig = await startProxy();
    const fetch = proxyConfig.fetch;
    const agent = proxyConfig.agent;

    const fetchOptions = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name: name }),
        timeout: 5000,
    };
    if (agent) { fetchOptions.agent = agent; }

    const response = await fetch(`${infoConfig["prototype_url"]}/${prototype_id}`, fetchOptions);
    try {
        const data = await response.json();
        return { status: response.status, data: data };
    } catch (error) {
        return { status: response.status, data: null };
    }
}

async function deletePrototype(id, token) {
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

    const response = await fetch(`${infoConfig["prototype_url"]}/${id}`, fetchOptions);
    try {
        const data = await response.json();
        return { status: response.status, data: data };
    } catch (error) {
        return { status: response.status, data: null };
    }
}

module.exports = { createPrototype, listPrototype, getPrototype, updatePrototype, deletePrototype }