import { gql } from "apollo-server";

export const authTypeDefs = gql`
  input SignupInput {
    email: String!
    password: String!
    username: String
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input ChangePasswordInput {
    newPassword: String!
  }

  type SignupResponse {
    message: String
    token: String
  }

  type LoginResponse {
    token: String
  }

  type Mutation {
    register(input: SignupInput): SignupResponse
    login(input: LoginInput): LoginResponse
    changePassword(input: ChangePasswordInput): String
  }
`;
