import { ApolloServer } from 'apollo-server';
import neo4j from 'neo4j-driver';
import config from 'config'


//const authenticator = new Gremlin.driver.auth.PlainTextSaslAuthenticator(`/dbs/${config.database}/colls/${config.collection}`, config.primaryKey)

class ConfigureDatabase {
    init() {
        const {host, user, secret} = config.Neo4jConfig;
        console.log(host, user, secret)
        return neo4j.driver(
            host,
            neo4j.auth.basic(user, secret)
        );
    }
}

export default new ConfigureDatabase();