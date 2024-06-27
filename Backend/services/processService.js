const callPythonScript = require("../utils/scriptConnector");

class ProcessService {
    constructor(processRepository) {
        this.processRepository = processRepository;
    }

    async getSneakerDetails(shoes_name) {
        const shoes = shoes_name.shoes;
        
        // getting the shoes data from the repository
        let shoes_data = await this.processRepository.getSneakerDetails(shoes);
        
        if(shoes_data && shoes_data.length > 0) { // if shoes present in db then return the data 
            return shoes_data;
        } else { // else call the scraper
            shoes_data = await callPythonScript(shoes);

            if(shoes_data && shoes_data.length > 0) {
                // await this.processRepository.storeSneakerDetails(shoes_data); // store new scraper data in repository
                return shoes_data; // returning the data to controller
            }
        } 
    }

    async update_details() {
        const update_response = await this.processRepository.update_details();

        return update_response;
    }
}

module.exports = ProcessService;
