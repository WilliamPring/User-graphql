const { ApolloServer, gql } = require('apollo-server');
import neo4j from 'neo4j-driver';
import { makeAugmentedSchema } from 'neo4j-graphql-js';
const { buildFederatedSchema } = require("@apollo/federation");

export default function() {

    const typeDefs = `
    type Query {
        "A simple type for getting started!"
        hello: String
      }

    `;
    const resolvers = {
        Query: {
          hello: () => 'world',
        },
      };

const schema = makeAugmentedSchema({ typeDefs, resolvers });
buildFederatedSchema
const driver = neo4j.driver(
    'bolt://localhost:7687',
    neo4j.auth.basic('neo4j', 'test')
  );
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: { driver },
    schema: buildFederatedSchema([{ schema }])

  });
server.listen(3003, '0.0.0.0').then(({ url }) => {
  console.log(`GraphQL API ready at ${url}`);
});
}