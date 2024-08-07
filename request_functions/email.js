const { startProxy } = require('../helper_functions/proxy');
const infoConfig = require('../helper_functions/info_config');

async function sendEmail(receiver, subject, content) {
    const { fetch, agent } = await startProxy();
    const response = await fetch(infoConfig["send_email_url"], {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            {
                to: receiver,
                subject: subject,
                content: content
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

module.exports = { sendEmail }