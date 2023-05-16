import { gql } from "apollo-server";

export const usersTypeDefs = gql`
  type User {
    id: Int
    username: String
    email: String
    password: String
  }

  type Query {
    getProfile: User
  }
`;
