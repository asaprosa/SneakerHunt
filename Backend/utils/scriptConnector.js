const { execFile } = require('child_process');
const path = require('path');

async function callPythonScript(shoes) {
    return new Promise((resolve, reject) => {
        const scriptPath = path.join(__dirname, '../scripts/main.py');
        const pythonExecutable = 'python'; // or 'python3' if needed
        const args = [scriptPath, shoes];
        
        execFile(pythonExecutable, args, (error, stdout, stderr) => {
            if (error) {
                reject(error);
                return;
            }
            if (stderr) {
                console.error("stderr:", stderr); // Log any errors from the script
            }
            try {
                const result = JSON.parse(stdout); // Parse the JSON output
                resolve(result);
            } catch (e) {
                reject(e);
            }
        });
    });
}

module.exports = callPythonScript;
