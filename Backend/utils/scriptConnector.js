const { execFile } = require('child_process');
const path = require('path');

async function callPythonScript(shoes) {
    // console.log("Shoes received in scriptConnector:", shoes); // Debug
    return new Promise((resolve, reject) => {
        const scriptPath = path.join(__dirname, '../scripts/main.py');
        const pythonExecutable = 'python'; // or 'python3' if needed
        const args = [scriptPath, shoes];
        
        execFile(pythonExecutable, args, (error, stdout, stderr) => {
            if (error) {
                return reject(error);
            }
            if (stderr) {
                console.error("stderr:", stderr); // Log any errors from the script
            }
            try {
                const result = JSON.parse(stdout); // Parse the JSON output
                // console.log("Result received from Python script:", result); // Debug
                resolve(result);
            } catch (e) {
                reject(e);
            }
        });
    });
}

module.exports = callPythonScript;
