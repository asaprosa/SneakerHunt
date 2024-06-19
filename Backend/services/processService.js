const callPythonScript = require("../utils/scriptConnector");

class ProcessService {
    async getSneakerDetails(shoes_name) {
        const shoes = shoes_name.shoes;
        
        const shoes_data = await callPythonScript(shoes);
        
        return shoes_data;
    }
}

module.exports = ProcessService;
