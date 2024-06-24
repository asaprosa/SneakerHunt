class ProcessService {
    constructor(processRepository) {
        this.processRepository = processRepository;
    }

    async getSneakerDetails(shoes_name) {
        const shoes = shoes_name.shoes;
        
        const shoes_data = await this.processRepository.getSneakerDetails(shoes);
        
        return shoes_data;
    }

    async update_details() {
        const update_response = await this.processRepository.update_details();

        return update_response;
    }
}

module.exports = ProcessService;
