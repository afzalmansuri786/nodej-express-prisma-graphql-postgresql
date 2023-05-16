import { PrismaClient } from "@prisma/client";
import { UsersService } from "./users.service";
import checkAuth from "../middleware/check-auth-graphl-context.midlleware";

const prisma = new PrismaClient();
const usersService = new UsersService(prisma);
export const usersResolver = {
  Query: {
    getProfile: async (_, __, context) => {
      const user = await checkAuth(context);
      if (!user) {
        return new Error("Unauthorized !");
      }
      const userProfile = await usersService.getProfile(user.id);
      return userProfile;
    },
  },
};
