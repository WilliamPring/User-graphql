import { makeAugmentedSchema } from 'neo4j-graphql-js';
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import {GraphqlSchemaConfig} from 'config'
console.log(GraphqlSchemaConfig)

export const schema = makeAugmentedSchema({ typeDefs, resolvers, config: GraphqlSchemaConfig });