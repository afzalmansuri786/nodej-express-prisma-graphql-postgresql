import checkAUth from "../middleware/check-auth-graphl-context.midlleware";
import { MoviesService } from "./movies.service";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const movieeService = new MoviesService(prisma);

export const moviesResolver = {
  Query: {
    listAllMovies: async (_, { input }, context) => {
      const user = await checkAUth(context);
      if (!user) {
        return new Error("Unauthorized");
      }
      const data = await movieeService.listAllMovies(input);
      return data;
    },
    findMovie: async (_, { input }, context) => {
      const user = await checkAUth(context);
      if (!user) {
        return new Error("Unauthorized");
      }
      const data = await movieeService.findMovie(input);
      return data;
    },
  },
  Mutation: {
    createMovie: async (_, { input }, context) => {
      const user = await checkAUth(context);
      if (!user) {
        return new Error("Unauthorized !");
      }
      const createMovieDto = {
        ...input,
        userId: user.id,
      };
      const movie = await movieeService.createMovie(createMovieDto);
      return movie;
    },
    updateMovie: async (_, { input }, context) => {
      const user = await checkAUth(context);
      if (!user) {
        return new Error("Unauthorized");
      }
      const data = await movieeService.updateMovie(input, user.id);
      return data;
    },
    deleteMovie: async (_, { input }, context) => {
      const user = await checkAUth(context);
      if (!user) {
        return new Error("Unauthorized");
      }
      const data = await movieeService.deleteMovie(input, user.id);
      return data;
    },
  },
};
