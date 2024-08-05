const { exec } = require('child_process');

function runTests(testFile) {
  return new Promise((resolve, reject) => {
    exec(`npm test ${testFile}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return reject(error);
      }
      if (stderr) {
        console.info(`\n\n${stderr}`);
      }
      console.log(`stdout: ${stdout}`);
      resolve(stdout);
    });
  });
}

async function main() {
  const testFiles = ['auth.test.js'];
  
  for (const testFile of testFiles) {
    try {
      await runTests(testFile);
    } catch (error) {
      console.error(`Failed to run tests for ${testFile}:`, error);
    }
  }
}

main();
