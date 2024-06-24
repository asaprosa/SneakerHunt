const mongoose = require('mongoose');
const Shoes = require('../models/shoesModel');
const callPythonScript = require("../utils/scriptConnector");

class ProcessRepository {
    async getSneakerDetails(shoes) {
        try {
            const regex = new RegExp(shoes, 'i'); // Create a regex for case-insensitive matching
            let shoes_data = await Shoes.find({ name: regex }); // Find shoes with names matching the regex

            if (shoes_data.length > 0) { // if shoes present in db then return the response
                return shoes_data;
            } else { 
                shoes_data = await callPythonScript(shoes); // call the web_scraper to get array of shoes

                if (shoes_data && shoes_data.length > 0) {
                    // Store the shoes_data in db
                    await Shoes.insertMany(shoes_data, { ordered: false });
                }

                return shoes_data;
            }
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ProcessRepository;
