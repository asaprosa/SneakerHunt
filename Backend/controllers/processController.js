const { StatusCodes } = require("http-status-codes");
const ProcessService = require("../services/processService");
const ProcessRepository = require("../repositories/processRepository"); 

const processService = new ProcessService(new ProcessRepository());

async function getSneakerName(req, res, next) {
    try {
        const sneaker_data = await processService.getSneakerDetails(req.body);

        return res.status(StatusCodes.OK).send(sneaker_data);
    } catch(error) {
        next(error);
    }
}

async function updateSneakerDetails(req, res, next) {
    try {
        const response = await processService.update_details();

        return res.status(StatusCodes.ACCEPTED).json({
            success: true,
            message: response
        });
    } catch(error) {
        next(error);
    }
}

module.exports = {
    getSneakerName,
    updateSneakerDetails
};