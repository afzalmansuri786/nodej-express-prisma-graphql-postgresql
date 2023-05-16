import checkAUth from "../middleware/check-auth-graphl-context.midlleware";
import { PrismaClient } from "@prisma/client";
import { ReviewsService } from "./reviews.service";

const prisma = new PrismaClient();
const reviewService = new ReviewsService(prisma);

export const reviewResolver = {
  Query: {
    listAllMovieReviews: async (_, { input }, context) => {
      const user = await checkAUth(context);
      if (!user) {
        return new Error("Unauthorized");
      }
      const data = await reviewService.listAllMovieReviews(input, user.id);
      return data;
    },
  },
  Mutation: {
    createMovieReview: async (_, { input }, context) => {
      const user = await checkAUth(context);
      if (!user) {
        return new Error("Unauthorized");
      }
      const data = await reviewService.creatMovierReview(input, user.id);
      return data;
    },
    updateMovieReview: async (_, { input }, context) => {
      const user = await checkAUth(context);
      if (!user) {
        return new Error("Unauthorized");
      }
      const data = await reviewService.updateMoviewReview(input, user.id);
      return data;
    },
    deleteMovieReview: async (_, { input }, context) => {
      const user = await checkAUth(context);
      if (!user) {
        return new Error("Unauthorized");
      }
      input.currentUserId = user.id;
      const data = await reviewService.deleteMovieReview(input);
      return data;
    },
  },
};
