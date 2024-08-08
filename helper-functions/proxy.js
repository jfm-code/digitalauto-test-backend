// async function startProxy() {
//     const { default: fetch } = await import('node-fetch');
//     const HttpsProxyAgent = (await import('https-proxy-agent')).HttpsProxyAgent;
//     const agent = new HttpsProxyAgent('http://127.0.0.1:3128');
//     return { fetch, agent };
// }

// module.exports = { startProxy };

const { exec } = require('child_process');

const checkIfCompanyNetwork = () => {
  return new Promise((resolve, reject) => {
    exec('nslookup bosch.com', (error, stdout, stderr) => {
      if (error) {
        console.log('nslookup error:', error);
        reject(error);
        return;
      }
      const isCompanyNetwork = stdout.includes('bosch.com');
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
      const agent = new HttpsProxyAgent('http://127.0.0.1:3128');
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
startProxy();
module.exports = { startProxy };