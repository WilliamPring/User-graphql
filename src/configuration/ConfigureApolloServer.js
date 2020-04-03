import { ApolloServer } from 'apollo-server';
import confDB from './ConfigureDatabase'
import neo4j from 'neo4j-driver';
import {schema} from '../schema'

class ConfigureApolloServer {

    configure() {
        const driver = neo4j.driver(
            'bolt://localhost:7687',
            neo4j.auth.basic('neo4j', 'test')
        );
        return new ApolloServer({ schema, context: { driver }});
    }
}

export default new ConfigureApolloServer()