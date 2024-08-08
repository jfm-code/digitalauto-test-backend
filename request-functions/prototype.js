const { startProxy } = require('../helper-functions/proxy');
const infoConfig = require('../helper-functions/info-config');

async function createPrototype(token, model_id, name) {
    const { fetch, agent } = await startProxy();
    const response = await fetch(infoConfig["prototype_url"], {
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
        timeout: 5000,
        agent: agent
    });
    try {
        const data = await response.json();
        return { status: response.status, data: data };
    } catch (error) {
        return { status: response.status, data: null };
    }
}

async function deletePrototype(id, token) {
    const { fetch, agent } = await startProxy();
    const response = await fetch(`${infoConfig["prototype_url"]}${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        timeout: 5000,
        agent: agent
    });
    try {
        const data = await response.json();
        return { status: response.status, data: data };
    } catch (error) {
        return { status: response.status, data: null };
    }
}

module.exports = { createPrototype, deletePrototype }