import neo4j from 'neo4j-driver';
import config from 'config'


//const authenticator = new Gremlin.driver.auth.PlainTextSaslAuthenticator(`/dbs/${config.database}/colls/${config.collection}`, config.primaryKey)
// neo4j://0.0.0.0:7687
class ConfigureDatabase {
    constructor() {
        const {host, user, secret} = config.Neo4jConfig;
        this._host = host;
        this._user = user;
        this._secret = secret;
        this._driver = neo4j.driver(this._host, neo4j.auth.basic(this._user, this._secret))
    }
    init() {
        return this._driver;
    }
    createSession() {
        return this._driver.session()
    }
    async closeSession() {
        return await this._driver.session().close();
    }
}

export default new ConfigureDatabase();