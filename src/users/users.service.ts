import { PrismaClient } from "@prisma/client";

export class UsersService {
  constructor(private prisma: PrismaClient) {}

  async getProfile(id: number) {
    try {
      const userProfile = await this.prisma.users.findUnique({
        where: {
          id,
        },
      });
      if (!userProfile) {
        return new Error("User not found !");
      }
      return userProfile;
    } catch (error) {
      throw new Error(error);
    }
  }
}
