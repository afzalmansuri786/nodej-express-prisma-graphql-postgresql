import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const checkAUth = async (context) => {
  try {
    const authHeader = context.req.headers.authorization;

    if (!authHeader) {
      return new Error("Unauthorized");
    }

    const token = authHeader.split(" ")[1];

    let reqUser;
    // Verify and decode the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        // return res.status(401).json({ message: "Invalid token" });
      }

      // Pass the decoded information to the next middleware or route handler
      reqUser = decoded;
    });
    const user = await prisma.users.findUnique({
      where: {
        id: reqUser.user,
      },
    });
    reqUser = user;
    return reqUser;
  } catch (error) {
    throw new Error(error);
  }
};

export default checkAUth;
