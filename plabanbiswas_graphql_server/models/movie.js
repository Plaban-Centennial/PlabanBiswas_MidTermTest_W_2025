// Load the Mongoose module and Schema object
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define a new 'StudentSchema'
const MovieSchema = new Schema({
    title: String,
    year: { type: Number, min: 1800, max: 2025},
    genre: String,
    description: String,
    rating: Number,
    watched: Boolean,
    
    
});

// Create the 'Movie' model out of the 'MovietSchema'
module.exports = mongoose.model('Movie', MovieSchema);