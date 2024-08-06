const { startProxy } = require('../helper_functions/proxy');
const infoConfig = require('./info_config');

async function list_users(page_number) {
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

async function get_user(id) {
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

async function create_user(email, password, name, token) {
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

async function update_user(new_password, token, id) {
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

async function delete_user(token, id) {
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

async function self_promote(token) {
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

async function get_self(token) {
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

async function update_self(new_password, token) {
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

module.exports = { list_users, get_user, update_user, delete_user, self_promote, get_self, create_user, update_self }