const express = require('express');
const { getUserData, getSneakerDetails } = require('../../controllers/processController');

const sneakerRouter = express.Router();

sneakerRouter.post('/sneaker', getUserData); // takes user input from frontend
sneakerRouter.post('/details', getSneakerDetails); // takes sneaker details from scraper

module.exports = sneakerRouter;