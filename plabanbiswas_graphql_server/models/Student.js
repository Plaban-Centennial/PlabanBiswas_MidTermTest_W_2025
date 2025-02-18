// Load the Mongoose module and Schema object
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define a new 'StudentSchema'
const StudentSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    college: String,
    program: String,
    startingYear: { type: Number, min: 2019, max: 2023},
    
	
});

// Create the 'Student' model out of the 'StudentSchema'
module.exports = mongoose.model('Student', StudentSchema);