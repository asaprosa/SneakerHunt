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
            } 
        } catch (error) {
            throw error;
        }
    }

    async storeSneakerDetails(shoes_data) {
        try {
            if(shoes_data && shoes_data.length > 0) {
                await Shoes.insertMany(shoes_data, {ordered: false});
            }
        } catch (error) {
            throw error;
        }
    }

    async update_details() {
        try {
            const allShoes = await Shoes.find(); // taking out all the data from db

            // Iterate over each shoe and update price if necessary
            for (let shoe of allShoes) {
                // Time consuming process if ran over 1 instance on regular PC
                const updatedShoeData = await callPythonScript(shoe.name); // Call web scraper for updated data

                const updatedShoe = updatedShoeData.find(item => item.name === shoe.name);

                if (updatedShoe && updatedShoe.price !== shoe.price) { // updating the price if not equal from previous one
                    await Shoes.updateOne({ _id: shoe._id }, { $set: { price: updatedShoe.price } });
                }
            }
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ProcessRepository;
