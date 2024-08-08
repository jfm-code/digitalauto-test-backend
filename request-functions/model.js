const { startProxy } = require('../helper-functions/proxy');
const infoConfig = require('../helper-functions/info-config');

async function listModels() {
    const proxyConfig = await startProxy();
    const fetch = proxyConfig.fetch;
    const agent = proxyConfig.agent;

    const fetchOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        timeout: 5000
    };
    if (agent) { fetchOptions.agent = agent; }

    const params = 'name,created_by,tenant_id,visibility';
    const response = await fetch(`${infoConfig["list_model_url"]}${params}`, fetchOptions);
    try {
        const data = await response.json();
        return { status: response.status, data: data };
    } catch (error) {
        return { status: response.status, data: null };
    }
}

async function createModel(token) {
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
                cvi: '{}',
                main_api: 'Testing',
                name: infoConfig["test_model_name"]
            }
        ),
        timeout: 5000
    };
    if (agent) { fetchOptions.agent = agent; }

    const response = await fetch(infoConfig["model_url"], fetchOptions);
    try {
        const data = await response.json();
        return { status: response.status, data: data };
    } catch (error) {
        return { status: response.status, data: null };
    }
}

async function getModel(id, token) {
    const proxyConfig = await startProxy();
    const fetch = proxyConfig.fetch;
    const agent = proxyConfig.agent;

    const fetchOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        timeout: 5000
    };
    if (agent) { fetchOptions.agent = agent; }

    const response = await fetch(`${infoConfig["model_url"]}${id}`, fetchOptions);
    try {
        const data = await response.json();
        return { status: response.status, data: data };
    } catch (error) {
        return { status: response.status, data: null };
    }
}

async function updateModel(id, token, name) {
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
        timeout: 5000
    };
    if (agent) { fetchOptions.agent = agent; }

    const response = await fetch(`${infoConfig["model_url"]}${id}`, fetchOptions);
    try {
        const data = await response.json();
        return { status: response.status, data: data };
    } catch (error) {
        return { status: response.status, data: null };
    }
}

async function deleteModel(id, token) {
    const proxyConfig = await startProxy();
    const fetch = proxyConfig.fetch;
    const agent = proxyConfig.agent;

    const fetchOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        timeout: 5000
    };
    if (agent) { fetchOptions.agent = agent; }

    const response = await fetch(`${infoConfig["model_url"]}${id}`, fetchOptions);
    try {
        const data = await response.json();
        return { status: response.status, data: data };
    } catch (error) {
        return { status: response.status, data: null };
    }
}

async function addContributor(model_id, contributor_id, token) {
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
                userId: contributor_id,
                role: 'model_contributor'
            }
        ),
        timeout: 5000
    };
    if (agent) { fetchOptions.agent = agent; }

    const response = await fetch(`${infoConfig["model_url"]}${model_id}/permissions`, fetchOptions);
    try {
        const data = await response.json();
        return { status: response.status, data: data };
    } catch (error) {
        return { status: response.status, data: null };
    }
}

async function deleteContributor(model_id, contributor_id, token) {
    const proxyConfig = await startProxy();
    const fetch = proxyConfig.fetch;
    const agent = proxyConfig.agent;

    const fetchOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(
            {
                userId: contributor_id,
                role: 'model_contributor'
            }
        ),
        timeout: 5000
    };
    if (agent) { fetchOptions.agent = agent; }

    const response = await fetch(`${infoConfig["model_url"]}${model_id}/permissions`, fetchOptions);
    try {
        const data = await response.json();
        return { status: response.status, data: data };
    } catch {
        return { status: response.status, data: null };
    }
}

module.exports = { listModels, createModel, getModel, updateModel, deleteModel, addContributor, deleteContributor };