const mongoose = require('mongoose');

const shoeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true 
    },
    price: {
        type: Number,
        required: true,
        min: 0 
    },
    link: {
        type: String,
        required: true,
        trim: true 
    },
    image: {
        type: String,
        required: true, 
        trim: true 
    }
}, {
    timestamps: true 
});

// Creating index on the name and link fields to ensure uniqueness
shoeSchema.index({ name: 1, link: 1 }, { unique: true });

const Shoes = mongoose.model("Shoes", shoeSchema);

module.exports = Shoes;
