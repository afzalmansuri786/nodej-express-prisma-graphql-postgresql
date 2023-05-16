import { Prisma, PrismaClient } from "@prisma/client";
import { ApolloError } from "apollo-server-express";
import {
  CreatMovieDto,
  DeleteMovieDto,
  FindMovieByIdDto,
  UpdateMovieDto,
  ListAllMoviesDto,
} from "./interfaces/movies.interface";

export class MoviesService {
  constructor(private readonly prisma: PrismaClient) {}

  async createMovie(createMovieDto: CreatMovieDto) {
    try {
      const movie = await this.prisma.movies.create({
        data: {
          description: createMovieDto.description,
          director: createMovieDto.director,
          name: createMovieDto.name,
          releaseDate: new Date(createMovieDto.releaseDate), // Corrected date format
          usersId: createMovieDto.userId,
        },
      });
      return movie;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateMovie(updateMovie: UpdateMovieDto, userId: number) {
    try {
      const existingMovie = await this.prisma.movies.findUnique({
        where: {
          id: updateMovie.id,
        },
      });
      if (!existingMovie) {
        return new Error("Movie not found.");
      }

      if (existingMovie.usersId !== userId) {
        return new Error("You can't update this movie details.");
      }

      if (!updateMovie.releaseDate) {
        delete updateMovie.releaseDate;
      } else {
        updateMovie.releaseDate = new Date(updateMovie.releaseDate);
      }

      if (updateMovie.description == undefined) {
        delete updateMovie.description;
      }

      if (updateMovie.director == undefined) {
        delete updateMovie.director;
      }

      if (updateMovie.name == undefined) {
        delete updateMovie.name;
      }
      const movie = await this.prisma.movies.update({
        where: {
          id: updateMovie.id,
        },
        data: { ...updateMovie },
      });
      return { message: "Movie updated !" };
    } catch (error) {
      throw new Error(error);
    }
  }

  async findMovie(findMovie: FindMovieByIdDto) {
    try {
      const movie = await this.prisma.movies.findUnique({
        where: {
          id: findMovie.id,
        },
      });
      if (!movie) {
        return new Error("Movie not found");
      }
      return movie;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteMovie(deleteMovie: DeleteMovieDto, userId: number) {
    try {
      const { id } = deleteMovie;
      const existingMovie = await this.prisma.movies.findUnique({
        where: {
          id,
        },
      });
      if (!existingMovie) {
        return new ApolloError("Movie not found.");
      }

      if (existingMovie.usersId !== userId) {
        return new Error("You can't update this movie details.");
      }

      // Delete the movie
      await this.prisma.movies.delete({
        where: {
          id,
        },
      });

      // Delete associated reviews for the movie
      await this.prisma.review.deleteMany({
        where: {
          movieId: id,
        },
      });

      return { message: "Movie deleted" };
    } catch (error) {
      throw new Error(error);
    }
  }

  async listAllMovies(listAllMovies: ListAllMoviesDto) {
    try {
      const { sortBy, sortOrder, filter, pagination, search } = listAllMovies;

      const where: Prisma.moviesWhereInput = {};

      // Apply filters
      if (filter) {
        // Add filter conditions based on your requirements
        if (filter.director) {
          where.director = { contains: filter.director };
        }
        if (filter.releaseDate) {
          where.releaseDate = { gte: filter.releaseDate };
        }
        // Add more filter conditions as needed
      }

      // Apply search
      if (search) {
        where.OR = [
          { name: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ];
      }

      // Apply sorting
      const orderBy: Prisma.moviesOrderByWithRelationInput = {};
      if (sortBy) {
        orderBy[sortBy] = sortOrder || "asc";
      }

      // Apply pagination
      const { page, pageSize } = pagination || {};
      const skip = page && pageSize ? (page - 1) * pageSize : undefined;
      const take = pageSize;

      const movies: any = await this.prisma.movies.findMany({
        where,
        orderBy,
        skip,
        take,
      });

      return movies;
    } catch (error) {
      throw new Error(error);
    }
  }
}
