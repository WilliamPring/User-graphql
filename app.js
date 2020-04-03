
require("@babel/register")
import { ApolloServer } from 'apollo-server';
import neo4j from 'neo4j-driver';
import { makeAugmentedSchema } from 'neo4j-graphql-js';
export default function() {

    const typeDefs = `

    type User {
        userName: String
        born: Date
        name: String
        restaurants: [Restaurant] @relation(name: "ATE_AT", direction: "OUT")
        reviews: [Review] @relation(name: "HAS_POST", direction: "OUT")
    }
    type Review {
        foods: [String],
        starRating: Float
        reviewSummary: String
        images: [Image] @relation(name: "HAS_IMAGE", direction: "OUT")
        author: User @relation(name: "HAS_POST", direction: "IN")
    }
    type Image {
        caption: String
        url: String
    }
    type Cuisine{
      type: String
    }
    type Restaurant {
        name: String
        priceRange: String
        info: String
        cuisines: [Cuisine] @relation(name: "TYPE_OF", direction: "OUT")
        location: Municipality @relation(name: "IS_IN", direction: "OUT")
        reviews: [Review] @relation(name: "FOOD_REVIEW", direction: "IN")
    }

    type Municipality {
        city: String
        provienceState: String
        country: Country @relation(name: "EXIST", direction: "OUT")
    }

    type Country {
        country: String
        municipalities: [Municipality] @relation(name: "EXIST", direction: "IN")
    }

    type Query {
        "A simple type for getting started!"
        hello: String
      }

    `;
    const resolvers = {
        Query: {
          hello: () => 'world'
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