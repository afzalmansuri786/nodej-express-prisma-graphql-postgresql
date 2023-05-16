export interface CreatMovieDto {
  name: string;
  description: string;
  director: string;
  releaseDate: Date;
  userId: number;
}

export interface UpdateMovieDto {
  id: number;
  name: string;
  description: string;
  director: string;
  releaseDate: Date;
}

export interface FindMovieByIdDto {
  id: number;
}

export interface DeleteMovieDto {
  id: number;
}

export interface ListAllMoviesDto {
  sortBy?: "name" | "director" | "releaseDate" | "id";
  sortOrder?: "asc" | "desc";
  filter?: {
    director?: string;
    releaseDate?: Date;
  };
  pagination?: {
    page?: number;
    pageSize?: number;
  };
  search?: string;
}
