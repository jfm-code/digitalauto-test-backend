const { startProxy } = require('../helper-functions/proxy');
const infoConfig = require('../info');

async function sendEmail(receiver, subject, content) {
    const proxyConfig = await startProxy();
    const fetch = proxyConfig.fetch;
    const agent = proxyConfig.agent;

    const fetchOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            to: receiver,
            subject: subject,
            content: content
        }),
        timeout: 5000,
    };
    if (agent) { fetchOptions.agent = agent; }

    const response = await fetch(infoConfig["send_email_url"], fetchOptions);
    try {
        const data = await response.json();
        return { status: response.status, data: data };
    } catch (error) {
        return { status: response.status, data: null };
    }
}

module.exports = { sendEmail };
