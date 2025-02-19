//user.server.resolvers.js
const Movie = require('../models/movie');
// 
const getMovies = async () => {
    //
    const movies = await Movie.find().exec();
    if (!movies) {
        throw new Error('Error');
    }
    return movies;
};
//
const getMovieById = async (root, args) => {
    //
    const movieInfo = await Movie.findById(args.id).exec();
    if (!movieInfo) {
        throw new Error('Error');
    }
    return movieInfo;
};
// 
const addMovie = async (root, params) => {
    const movieModel = new Movie(params);
    const newMovie = await movieModel.save();
    if (!newMovie) {
        throw new Error('Error');
    }
    return newMovie
}
// 
const updateMovie = async (parent, args) => {
    console.log('args in update movie :', args);
    try {
        const { id, ...update } = args;
        const options = { new: true };
        const updatedMovie = await Movie.findByIdAndUpdate(id, update, options);

        if (!updatedMovie) {
            throw new Error(`Movie with ID ${id} not found`);
        }

        return updatedMovie;
    } catch (error) {
        console.error('Error updating movie:', error);
        throw new Error('Failed to update movie');
    }
};

const deleteMovie = async (root, params) => {
    try {
        const deletedMovie = await Movie.findOneAndRemove({ email: params.email }).exec();

        if (!deletedMovie) {
            throw new Error(`Movie with email ${params.email} not found`);
        }

        return deletedMovie;
    } catch (error) {
        console.error('Error deleting movie:', error);
        throw new Error('Failed to delete movie');
    }
};

// ADDED CODE
const deleteTask = async (parent, args) => {
    try {
        const deletedMovie = await Movie.findByIdAndDelete(args.id).exec();

        if (!deletedMovie) {
            throw new Error(`Movie with email ${params.email} not found`);
        }

        return deletedMovie;
    } catch (error) {
        console.error('Error deleting movie:', error);
        throw new Error('Failed to delete movie');
    }
};


// Make resolvers available to other modules
module.exports = {
    getMovies,
    getMovieById,
    addMovie,
    updateMovie,
    deleteMovie,
    deleteTask
};  