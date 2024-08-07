const { startProxy } = require('../helper_functions/proxy');
const infoConfig = require('../helper_functions/info_config');

async function listModels() {
    const { fetch, agent } = await startProxy();
    try {
        const params = 'name,created_by,tenant_id,visibility';
        const response = await fetch(`${infoConfig["list_model_url"]}${params}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
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

async function createModel(token) {
    const { fetch, agent } = await startProxy();
    try {
        const response = await fetch(infoConfig["model_url"], {
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
            timeout: 5000,
            agent: agent
        });
        const data = await response.json();
        return { status: response.status, data: data };
    } catch (error) {
        console.error('Error:', error);
    }
}

async function getModel(id, token) {
    const { fetch, agent } = await startProxy();
    try {
        const response = await fetch(`${infoConfig["model_url"]}${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            timeout: 5000,
            agent: agent
        });
        const data = await response.json();;
        return { status: response.status, data: data };
    } catch (error) {
        console.error('Error:', error);
    }
}

async function updateModel(id, token, name) {
    const { fetch, agent } = await startProxy();
    try {
        const response = await fetch(`${infoConfig["model_url"]}${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ name: name }),
            timeout: 5000,
            agent: agent
        });
        const data = await response.json();
        return { status: response.status, data: data };
    } catch (error) {
        console.error('Error:', error);
    }
}

async function deleteModel(id, token) {
    const { fetch, agent } = await startProxy();
    const response = await fetch(`${infoConfig["model_url"]}${id}`, {
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

async function addContributor(model_id, contributor_id, token) {
    const { fetch, agent } = await startProxy();
    const response = await fetch(`${infoConfig["model_url"]}${model_id}/permissions`, {
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

async function deleteContributor(model_id, contributor_id, token) {
    const { fetch, agent } = await startProxy();
    const response = await fetch(`${infoConfig["model_url"]}${model_id}/permissions`, {
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

module.exports = { listModels, createModel, getModel, updateModel, deleteModel, addContributor, deleteContributor };