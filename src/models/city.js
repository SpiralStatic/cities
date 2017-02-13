var mongoose = require('mongoose');

function validateBannedWords(value) {
    var bannedWords = ['fuck', 'shit', 'twat'];
    // Check for each banned word in the body text
    var word = null;
    while (word = bannedWords.pop()) {
        if (value.indexOf(word) !== -1)
            return false;
    }
    // None were found, you passed!
    return true;
}

// Create a new schema
var citySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: validateBannedWords,
            message: "Please use non-offensive vocabulary"
        }
    },
    image: {
        type: String
    },
    country: {
        type: String,
        required: true,
        validate: {
            validator: validateBannedWords,
            message: "Please use non-offensive vocabulary"
        }
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
    landmarks: [{
        type: String,
        validate: {
            validator: validateBannedWords,
            message: "Please use non-offensive vocabulary"
        }
    }]
});

// Tell mongoose to create a real model from our schema and export it
module.exports = mongoose.model('City', citySchema);
