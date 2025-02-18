var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLDate = require('graphql-date');
var StudentModel = require('../models/Student');
// Import resolvers for each operation
const { addStudent, updateStudent, deleteStudent, getStudentById, getStudents, deleteTask } = require('../resolvers/student.server.resolvers');

// Create a GraphQL Object Type for Student model
const studentType = new GraphQLObjectType({
  name: 'student',
  fields: function () {
    return {
      id: {
        type: GraphQLID // Unique identifier for the student (typically corresponds to MongoDB _id)
      },
      firstName: {
        type: GraphQLString
      },
      lastName: {
        type: GraphQLString
      },
      email: {
        type: GraphQLString
      },
      college: {
        type: GraphQLString
      },
      program: {
        type: GraphQLString
      },
      startingYear: {
        type: GraphQLInt
      }


    }
  } //
});
//
// create a GraphQL query type that returns all students or a student by id
const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: function () {
    return {
      students: {
        type: new GraphQLList(studentType),
        resolve: getStudents
      },
      student: {
        type: studentType,
        args: {
          id: {
            name: 'id',
            type: GraphQLString
          }
        },
        resolve: getStudentById
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
      addStudent: {
        type: studentType,
        args: {
          /*
          id: {
            type: new GraphQLNonNull(GraphQLString)
          },
          */

          firstName: {
            type: new GraphQLNonNull(GraphQLString)
          },
          lastName: {
            type: new GraphQLNonNull(GraphQLString)
          },
          email: {
            type: new GraphQLNonNull(GraphQLString)
          },
          college: {
            type: new GraphQLNonNull(GraphQLString)
          },
          program: {
            type: new GraphQLNonNull(GraphQLString)
          },
          startingYear: {
            type: new GraphQLNonNull(GraphQLInt)
          }
        },
        resolve: addStudent
      },
      updateStudent: {
        type: studentType,
        args: {
          id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLString)
          },
          firstName: {
            type: new GraphQLNonNull(GraphQLString)
          },
          lastName: {
            type: new GraphQLNonNull(GraphQLString)
          },
          email: {
            type: new GraphQLNonNull(GraphQLString)
          },
          college: {
            type: new GraphQLNonNull(GraphQLString)
          },
          program: {
            type: new GraphQLNonNull(GraphQLString)
          },
          startingYear: {
            type: new GraphQLNonNull(GraphQLInt)
          }

        },
        resolve: updateStudent
      },
      deleteStudent: {
        type: studentType,
        args: {
          email: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve: deleteStudent
      },
      deleteTask: {
        type: studentType,
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
