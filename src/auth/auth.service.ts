import { PrismaClient, movies } from "@prisma/client";
import argon2 from "argon2";
import * as jwt from "jsonwebtoken";

import { UserCreateInput, UserLoginInput } from "./interfaces/auth.interface";

export class AuthService {
  constructor(private readonly prisma: PrismaClient) {}

  async singup(signupDto: UserCreateInput) {
    try {
      const existingUser = await this.prisma.users.findUnique({
        where: {
          email: signupDto.email,
        },
      });

      if (existingUser) {
        return new Error("User already exist !");
      }
      const argon2Hash = await argon2.hash(signupDto.password);
      signupDto.password = argon2Hash;

      const user = await this.prisma.users.create({
        data: signupDto,
      });
      const token = jwt.sign({ user: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1day",
      });
      return {
        message: "success",
        token: token,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async login(loginDto: UserLoginInput) {
    try {
      const user = await this.prisma.users.findUnique({
        where: {
          email: loginDto.email,
        },
      });

      if (!user) {
        return new Error("User not found !");
      }
      const isValidPassword = await argon2.verify(
        user.password,
        loginDto.password
      );

      if (!isValidPassword) {
        return new Error("Invalid password !");
      }
      const token = jwt.sign({ user: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1day",
      });

      return { user, token };
    } catch (error) {
      throw new Error(error);
    }
  }

  async changePassword(
    changePasswordDto: { newPassword: string },
    userId: number
  ) {
    try {
      const { newPassword } = changePasswordDto;
      const userProfile = await this.prisma.users.findUnique({
        where: {
          id: userId,
        },
      });
      if (!userProfile) {
        return new Error("User not found !");
      }
      const argon2Hash = await argon2.hash(newPassword);
      await this.prisma.users.update({
        where: {
          email: userProfile.email,
        },
        data: {
          password: argon2Hash,
        },
      });
      return { message: "password changed !" };
    } catch (error) {
      throw new Error(error);
    }
  }
}
