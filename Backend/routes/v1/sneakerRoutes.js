const express = require('express');
const { getSneakerName, updateSneakerDetails } = require('../../controllers/processController');

const sneakerRouter = express.Router();

sneakerRouter.post('/', getSneakerName); // takes user input for name of sneaker

sneakerRouter.patch('/update_details', updateSneakerDetails); // updates the details of present sneakers in db

module.exports = sneakerRouter;