const { startProxy } = require('../helper_functions/proxy');
const infoConfig = require('./info_config');

async function listUsers(page_number) {
    const { fetch, agent } = await startProxy();
    try {
        const response = await fetch(`${infoConfig["list_user_url"]}${page_number}`, {
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
    };
}

async function getUser(id) {
    const { fetch, agent } = await startProxy();
    try {
        const response = await fetch(`${infoConfig["user_url"]}${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            timeout: 5000,
            agent: agent
        });
        const data = await response.json();
        return { status: response.status, data: data };
    } catch (error) {
        console.error('Error:', error);
    };
}

async function createUser(email, password, name, token) {
    const { fetch, agent } = await startProxy();
    try {
        const response = await fetch(infoConfig["user_url"], {
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
            agent: agent
        });
        const data = await response.json();
        return { status: response.status, data: data };
    } catch (error) {
        console.error('Error:', error);
    };
}

async function updateUser(new_password, token, id) {
    const { fetch, agent } = await startProxy();
    try {
        const response = await fetch(`${infoConfig["user_url"]}${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({password: new_password,}),
            timeout: 5000,
            agent: agent
        });
        const data = await response.json();
        return { status: response.status, data: data };
    } catch (error) {
        console.error('Error:', error);
    };
}

async function deleteUser(token, id) {
    const { fetch, agent } = await startProxy();
    const response = await fetch(`${infoConfig["user_url"]}${id}`, {
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
    } catch {
        return { status: response.status, data: null };
    }
}

async function selfPromote(token) {
    const { fetch, agent } = await startProxy();
    try {
        const response = await fetch(`${infoConfig["self_url"]}/promote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            timeout: 5000,
            agent: agent
        });
        const data = await response.json();
        return { status: response.status, data: data };
    } catch (error) {
        console.error('Error:', error);
    };
}

async function getSelf(token) {
    const { fetch, agent } = await startProxy();
    try {
        const response = await fetch(infoConfig["self_url"], {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            timeout: 5000,
            agent: agent
        });
        const data = await response.json();
        return { status: response.status, data: data };
    } catch (error) {
        console.error('Error:', error);
    };
}

async function updateSelf(new_password, token) {
    const { fetch, agent } = await startProxy();
    try {
        const response = await fetch(infoConfig["self_url"], {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({password: new_password,}),
            timeout: 5000,
            agent: agent
        });
        const data = await response.json();
        return { status: response.status, data: data };
    } catch (error) {
        console.error('Error:', error);
    };
}

module.exports = { listUsers, getUser, updateUser, deleteUser, selfPromote, getSelf, createUser, updateSelf }