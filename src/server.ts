import express from "express";
import { ApolloServer, gql } from "apollo-server";
import { GraphQLError } from "graphql";
import { mergeTypeDefs } from "@graphql-tools/merge";

import { usersResolver } from "../src/users/users.resolver";
import { authResolver } from "../src/auth/auth.resolver";
import { moviesResolver } from "../src/movies/movies.resolver";
import { reviewResolver } from "../src/reviews/reviews.resolver";

import { moviesTypeDefs } from "../src/movies/movies.typedef";
import { reviewTypeDefs } from "../src/reviews/reviews.typedefs";
import { usersTypeDefs } from "../src/users/users.typedefs";
import { authTypeDefs } from "./auth/auth.typedefs";

const app = express();

app.use(express.json());
import { merge } from "lodash";
app.use(express.urlencoded());

const hellotypeDef = gql`
  type Query {
    hello: String
  }
`;
const helloResolvers = {
  Query: {
    hello: () => {
      return "Hello";
    },
  },
};

const typedefs = mergeTypeDefs([
  hellotypeDef,
  usersTypeDefs,
  authTypeDefs,
  moviesTypeDefs,
  reviewTypeDefs,
]);

const resolvers = merge(
  helloResolvers,
  usersResolver,
  authResolver,
  moviesResolver,
  reviewResolver
);

const server = new ApolloServer({
  typeDefs: typedefs,
  resolvers: resolvers,
  context: async ({ req }) => ({ req }),
  cors: {
    origin: true,
    credentials: true,
  },
  formatError: (error: GraphQLError) => {
    return new Error(
      error?.extensions?.response?.error ??
        error?.extensions?.response?.message ??
        error?.extensions?.exception?.error ??
        error?.extensions.exception?.message ??
        error?.message
    );
  },
});

const PORT: any = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Graphql server is running on port |${PORT}|`);
});
