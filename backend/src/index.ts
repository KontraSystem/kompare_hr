"use strict";
import "reflect-metadata";
import "dotenv/config";
import express from "express";
import { createYoga } from "graphql-yoga";
import schema from "./graphql/schema";
import mongoose from "mongoose";

const port = process.env.PORT ?? 4000;

const app = express();
const yoga = createYoga({ schema });

app.use(yoga.graphqlEndpoint, yoga);

const main = async () => {
  await mongoose.connect(
    process.env.DB_URI ?? "");

  app.listen(port, () => {
    console.log(`Running a GraphQL API server at port ${port}`);
  });
};

main();
