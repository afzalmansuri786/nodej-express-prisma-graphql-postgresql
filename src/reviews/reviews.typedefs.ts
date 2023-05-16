import { gql } from "apollo-server";

export const reviewTypeDefs = gql`
  enum MovieReviewSortField {
    id
    rating
  }

  enum SortOrder {
    asc
    desc
  }

  input ListAllMovieReviewsInput {
    movieId: Int
    rating: Float
    searchByComment: String
    sortBy: MovieReviewSortField
    sortOrder: SortOrder
    pagination: PaginationInput
  }

  input PaginationInput {
    page: Int
    pageSize: Int
  }

  input DeleteMovieReviewInput {
    id: Int!
  }

  input UpdateMovieReviewInput {
    id: Int!
    rating: Float!
  }

  input CreateMovieReviewInput {
    movieId: Int!
    rating: Float!
    comment: String
  }

  type DeleteMovieReviewResponse {
    message: String
  }

  type MovieReview {
    id: Int
    movieId: Int
    userId: Int
    rating: Float
    comment: String
  }

  type Query {
    listAllMovieReviews(input: ListAllMovieReviewsInput): [MovieReview]
  }

  type Mutation {
    createMovieReview(input: CreateMovieReviewInput): MovieReview
    updateMovieReview(input: UpdateMovieReviewInput): DeleteMovieReviewResponse
    deleteMovieReview(input: DeleteMovieReviewInput): DeleteMovieReviewResponse
  }
`;
