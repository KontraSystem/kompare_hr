"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_yoga_1 = require("graphql-yoga");
const mutations_resolver_1 = require("./resolvers/mutations.resolver");
const queries_resolver_1 = require("./resolvers/queries.resolver");
const index_types_1 = require("./index.types");
const resolvers = {
    Query: queries_resolver_1.Queries,
    Mutation: mutations_resolver_1.Mutations,
};
const schema = (0, graphql_yoga_1.createSchema)({
    resolvers: [resolvers],
    typeDefs: [index_types_1.typeDefinitions],
});
exports.default = schema;
//# sourceMappingURL=schema.js.map