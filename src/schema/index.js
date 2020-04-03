import { makeAugmentedSchema } from 'neo4j-graphql-js';
import typeDefs from './typeDefs'
import resolvers from './resolvers'
export const schema = makeAugmentedSchema({ typeDefs, resolvers });