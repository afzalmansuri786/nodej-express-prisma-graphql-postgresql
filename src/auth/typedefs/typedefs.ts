// const { gql } = require("apollo-server-express");

// const typeDefs = gql`
//   type User {
//     id: ID!
//     username: String!
//     email: String!
//     password: String!
//   }

//   type Movie {
//     id: ID!
//     name: String!
//     description: String!
//     director: String!
//     releaseDate: String!
//   }

//   type Review {
//     id: ID!
//     movieId: ID!
//     userId: ID!
//     rating: Int!
//     comment: String
//   }

//   type Query {
//     movies: [Movie!]!
//     movie(id: ID!): Movie
//     movieReviews(movieId: ID!): [Review!]!
//   }

//   type Mutation {
//     signUp(username: String!, email: String!, password: String!): AuthPayload!
//     login(username: String!, password: String!): AuthPayload!
//     changePassword(userId: ID!, newPassword: String!): User!
//     createMovie(
//       name: String!
//       description: String!
//       director: String!
//       releaseDate: String!
//     ): Movie!
//     updateMovie(
//       id: ID!
//       name: String
//       description: String
//       director: String
//       releaseDate: String
//     ): Movie!
//     deleteMovie(id: ID!): Movie!
//     createReview(
//       movieId: ID!
//       userId: ID!
//       rating: Int!
//       comment: String
//     ): Review!
//     updateReview(id: ID!, rating: Int, comment: String): Review!
//     deleteReview(id: ID!): Review!
//   }

//   type AuthPayload {
//     user: User!
//     token: String!
//   }
// `;

// module.exports = typeDefs;
