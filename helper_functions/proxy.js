async function startProxy() {
    const { default: fetch } = await import('node-fetch');
    const HttpsProxyAgent = (await import('https-proxy-agent')).HttpsProxyAgent;
    const agent = new HttpsProxyAgent('http://127.0.0.1:3128');
    return { fetch, agent };
}

module.exports = { startProxy };
