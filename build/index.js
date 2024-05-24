"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const graphql_yoga_1 = require("graphql-yoga");
const schema_1 = __importDefault(require("./graphql/schema"));
const mongoose_1 = __importDefault(require("mongoose"));
const port = process.env.PORT ?? 4000;
const app = (0, express_1.default)();
const yoga = (0, graphql_yoga_1.createYoga)({ schema: schema_1.default });
app.use(yoga.graphqlEndpoint, yoga);
const main = async () => {
    console.log(process.env.DB_URI);
    await mongoose_1.default.connect(process.env.DB_URI ?? "");
    app.listen(port, () => {
        console.log(`Running a GraphQL API server at port ${port}`);
    });
};
main();
//# sourceMappingURL=index.js.map