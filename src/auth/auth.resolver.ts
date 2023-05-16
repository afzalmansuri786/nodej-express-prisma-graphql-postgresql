import { PrismaClient } from "@prisma/client";
import { AuthService } from "./auth.service";
import checkAUth from "../middleware/check-auth-graphl-context.midlleware";

const prisma = new PrismaClient();
const authService = new AuthService(prisma);

export const authResolver = {
  Mutation: {
    register: async (_, { input }) => {
      return await authService.singup(input);
    },
    login: async (_, { input }) => {
      return await authService.login(input);
    },
    changePassword: async (_, { input }, context) => {
      const user = await checkAUth(context);
      if (!user) {
        return new Error("Unauthorized !");
      }
      return await authService.changePassword(input, user.id);
    },
  },
};
