var mongoose = require('mongoose');

// Create a new schema
var citySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String
    },
    country: {
        type: String,
        required: true
    },
    population: {
        type: Number,
        required: true,
        min: 1000000,
        max: 50000000
    },
    ranking: {
        type: Number,
        required: true,
        unique: true,
        min: 1,
        max: 70
    },
    landmarks: [String]
});

// Tell mongoose to create a real model from our schema and export it
module.exports = mongoose.model('City', citySchema);
