import { createSchema } from "graphql-yoga";
import { Mutations } from "./resolvers/mutations.resolver";
import { Queries } from "./resolvers/queries.resolver";
import { typeDefinitions } from "./index.types";

const resolvers = {
  Query: Queries,
  Mutation: Mutations,
};

const schema = createSchema({
  resolvers: [resolvers],
  typeDefs: [typeDefinitions],
});

export default schema;
