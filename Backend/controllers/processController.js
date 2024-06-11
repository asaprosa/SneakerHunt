async function getUserData(req, res, next) {
    return res.status(201).json({
        message: "user input recieved",
    });
}

async function getSneakerDetails(req, res, next) {
    return res.status(201).json({
        message: "Sneaker data fetched ",
    });
}

module.exports = {
    getUserData,
    getSneakerDetails,
};