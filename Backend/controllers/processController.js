const { StatusCodes } = require("http-status-codes");
const ProcessService = require("../services/processService");

const processService = new ProcessService();

async function getSneakerName(req, res, next) {
    try {
        const sneaker_data = await processService.getSneakerDetails(req.body);

        return res.status(StatusCodes.OK).send(sneaker_data);
    } catch(error) {
        next(error);
    }
}

module.exports = {
    getSneakerName,
};