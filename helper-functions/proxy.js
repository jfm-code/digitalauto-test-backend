const { exec } = require('child_process');
const infoConfig = require('../info');

const checkIfCompanyNetwork = () => {
  return new Promise((resolve, reject) => {
    exec('nslookup .com', (error, stdout, stderr) => {
      if (error) {
        console.log('nslookup error:', error);
        reject(error);
        return;
      }
      const isCompanyNetwork = stdout.includes(infoConfig["company_domain"]);
    //   console.log(stdout);
      resolve(isCompanyNetwork);
    });
  });
};

async function startProxy() {
  const { default: fetch } = await import('node-fetch');

  try {
    const isCompanyNetwork = await checkIfCompanyNetwork();
    if (isCompanyNetwork) {
    //   console.log("Using company network - starting proxy");
      const HttpsProxyAgent = (await import('https-proxy-agent')).HttpsProxyAgent;
      const agent = new HttpsProxyAgent(infoConfig["proxy_url"]);
      return { fetch, agent };
    } else {
    //   console.log("Not using company network - not starting proxy");
      return { fetch };
    }
  } catch (error) {
    console.error('Failed to determine network status:', error);
    return { fetch };
  }
}

module.exports = { startProxy };