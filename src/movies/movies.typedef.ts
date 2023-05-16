import { gql } from "apollo-server";
export const moviesTypeDefs = gql`
  input ListAllMoviesInput {
    sortBy: MovieSortBy
    sortOrder: MovieSortOrder
    filter: MovieFilterInput
    pagination: PaginationInput
    search: String
  }

  input MovieFilterInput {
    director: String
    releaseDate: String
  }

  input PaginationInput {
    page: Int
    pageSize: Int
  }

  enum MovieSortOrder {
    asc
    desc
  }

  enum MovieSortBy {
    id
    name
    director
    releaseDate
  }

  input FindMovieByIdInput {
    id: Int!
  }

  input CreateMovieInput {
    name: String!
    description: String!
    director: String!
    releaseDate: String!
  }

  input DeleteMovieInput {
    id: Int!
  }

  input UpdateMovieInput {
    id: Int!
    name: String
    director: String
    releaseDate: String
    description: String
  }

  type Movie {
    id: Int
    name: String
    description: String
    director: String
    releaseDate: String
    usersId: Int
  }

  type DeleteMovieResponse {
    message: String
  }

  type Query {
    findMovie(input: FindMovieByIdInput): Movie
    listAllMovies(input: ListAllMoviesInput): [Movie]
  }

  type Mutation {
    createMovie(input: CreateMovieInput): Movie
    updateMovie(input: UpdateMovieInput): DeleteMovieResponse
    deleteMovie(input: DeleteMovieInput): DeleteMovieResponse
  }
`;
