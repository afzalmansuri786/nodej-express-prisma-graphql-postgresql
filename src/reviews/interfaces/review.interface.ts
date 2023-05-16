export interface DeleteMovieReviewInput {
  id: number;
  currentUserId: number;
}
export interface UpdateMoviewReviewInput {
  id: number;
  rating: number;
}

export interface ListAllMovieReviewsInput {
  movieId?: number;
  rating?: number;
  searchByComment: string;
  sortBy?: "id" | "rating";
  sortOrder?: "asc" | "desc";
  pagination?: PaginationInput;
}

export interface PaginationInput {
  page: number;
  pageSize: number;
}

export interface CreateMovieReviewInput {
  movieId: number;
  userId: number;
  rating: number;
  comments: string;
}
