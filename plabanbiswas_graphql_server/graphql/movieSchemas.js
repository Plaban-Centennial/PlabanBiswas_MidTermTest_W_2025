var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLBoolean = require('graphql').GraphQLBoolean;
var GraphQLDate = require('graphql-date');
var MovieModel = require('../models/movie');
// Import resolvers for each operation
const { addMovie, updateMovie, deleteMovie, getMovieById, getMovies, deleteTask } = require('../resolvers/movie.server.resolvers');

// Create a GraphQL Object Type for Movie model
const movieType = new GraphQLObjectType({
    name: 'movie',
    fields: function () {
        return {
            id: {
                type: GraphQLID // Unique identifier for the movie (typically corresponds to MongoDB _id)
            },
            title: {
                type: GraphQLString
            },
            year: {
                type: GraphQLInt
            },
            genre: {
                type: GraphQLString
            },
            description: {
                type: GraphQLString
            },
            rating: {
                type: GraphQLInt
            },
            watched: {
                type: GraphQLBoolean
            }
        }
    } //
});
//
// create a GraphQL query type that returns all movies or a movie by id
const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: function () {
        return {
            movies: {
                type: new GraphQLList(movieType),
                resolve: getMovies
            },
            movie: {
                type: movieType,
                args: {
                    id: {
                        name: 'id',
                        type: GraphQLString
                    }
                },
                resolve: getMovieById
            }
        }
    }
});
//
// add mutations for CRUD operations
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: function () {
        return {
            addMovie: {
                type: movieType,
                args: {
                    /*
                    id: {
                      type: new GraphQLNonNull(GraphQLString)
                    },
                    */
                    title: {
                        type: GraphQLString
                    },
                    year: {
                        type: GraphQLInt
                    },
                    genre: {
                        type: GraphQLString
                    },
                    description: {
                        type: GraphQLString
                    },
                    rating: {
                        type: GraphQLInt
                    },
                    watched: {
                        type: GraphQLBoolean
                    }
                },
                resolve: addMovie
            },
            updateMovie: {
                type: movieType,
                args: {
                    id: {
                        name: 'id',
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    title: {
                        type: GraphQLString
                    },
                    year: {
                        type: GraphQLInt
                    },
                    genre: {
                        type: GraphQLString
                    },
                    description: {
                        type: GraphQLString
                    },
                    rating: {
                        type: GraphQLInt
                    },
                    watched: {
                        type: GraphQLBoolean
                    }
                },
                resolve: updateMovie
            },
            deleteMovie: {
                type: movieType,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve: deleteMovie
            },
            deleteTask: {
                type: movieType,
                args: {
                    id: { type: new GraphQLNonNull(GraphQLString) },
                },
                resolve: deleteTask,
            }
        }
    }
});

//
module.exports = new GraphQLSchema({ query: queryType, mutation: mutation });
