
require("@babel/register")
import { ApolloServer } from 'apollo-server';
import neo4j from 'neo4j-driver';
import { makeAugmentedSchema } from 'neo4j-graphql-js';
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

const driver = neo4j.driver(
    'bolt://localhost:7687',
    neo4j.auth.basic('neo4j', 'test')
  );
  const server = new ApolloServer({ schema, context: { driver } });

server.listen(3003, '0.0.0.0').then(({ url }) => {
  console.log(`GraphQL API ready at ${url}`);
});
}