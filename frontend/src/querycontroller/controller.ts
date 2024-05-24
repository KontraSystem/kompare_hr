import { useQuery } from "react-query";
import { GraphQLClient, request, RequestDocument } from "graphql-request";

const endpoint = "http://localhost:4000/graphql/";
const client = new GraphQLClient(endpoint, {
  method: `POST`,
  jsonSerializer: {
    parse: JSON.parse,
    stringify: JSON.stringify,
  },
});
const GraphQL = async (
  query: RequestDocument,
  variables?: { [key: string]: any }
) => {
  return await client.request(query, variables);
};

export default GraphQL;
