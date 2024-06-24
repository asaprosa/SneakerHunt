const express = require('express');
const { getSneakerName } = require('../../controllers/processController');

const sneakerRouter = express.Router();

sneakerRouter.post('/', getSneakerName); // takes user input for name of sneaker

module.exports = sneakerRouter;