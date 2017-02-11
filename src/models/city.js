var mongoose = require('mongoose');

// Create a new schema
var citySchema = mongoose.Schema({
    name: String,
    country: String,
    population: Number,
    ranking: Number, 
    landmarks: [String]
});

// Tell mongoose to create a real model from our schema and export it
module.exports = mongoose.model('City', citySchema);
