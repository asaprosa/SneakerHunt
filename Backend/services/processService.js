class ProcessService {
    constructor(processRepository) {
        this.processRepository = processRepository;
    }

    async getSneakerDetails(shoes_name) {
        const shoes = shoes_name.shoes;
        
        const shoes_data = await this.processRepository.getSneakerDetails(shoes);
        
        return shoes_data;
    }
}

module.exports = ProcessService;
