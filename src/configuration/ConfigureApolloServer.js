import { ApolloServer } from 'apollo-server';
import confDB from './ConfigureDatabase'
import {schema} from '../schema'

class ConfigureApolloServer {

    configure() {
        const driver = confDB.init();
        return new ApolloServer({ schema, context: { driver }});
    }
}

export default new ConfigureApolloServer()