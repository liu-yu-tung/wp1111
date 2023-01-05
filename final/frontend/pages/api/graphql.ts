// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createYoga, createSchema } from "graphql-yoga";
import type { NextApiRequest, NextApiResponse } from "next";
import { join } from "path";
import { readFileSync } from "fs";
import Query from "../../components/api/graphql/resolver/Query";
import Mutation from "../../components/api/graphql/resolver/Mutation";
import { membersInit } from "../../components/api/dbInit";
import { Member } from "../../components/api/graphql/types";
// Docs: https://vercel.com/docs/concepts/functions/serverless-functions

let members: Member[] = membersInit;
export const config = {
  api: {
    // Disable body parsing (required for file uploads)
    bodyParser: false,
  },
};

export default createYoga<{
  req: NextApiRequest;
  res: NextApiResponse;
}>({
  graphqlEndpoint: "/api/graphql",
  schema: createSchema({
    typeDefs: readFileSync(
      join(process.cwd(), "components/api/graphql/schema.graphql"),
      { encoding: "utf-8" }
    ),
    resolvers: {
      Query,
      Mutation,
    },
  }),
  context: {
    members,
  },
});
