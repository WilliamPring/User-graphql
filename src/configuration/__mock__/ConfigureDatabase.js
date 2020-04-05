import neo4j from 'neo4j-driver';
///   host: 'bolt://localhost:7687',
//user: 'neo4j',
//secret: 'test'
class ConfigureDatabase {
    constructor() {
        //should not connect to db but have to as there is no mock driver atm
        this._driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "test"))
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