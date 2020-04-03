import { ApolloServer } from 'apollo-server';
import neo4j from 'neo4j-driver';


class ConfigureDatabase {
    init() {
        return neo4j.driver(
            'bolt://localhost:7687',
            neo4j.auth.basic('neo4j', 'test')
        );
    }
}

export default new ConfigureDatabase();