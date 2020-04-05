//const neo4j = require('neo4j-driver')
//import {isEmpty} from 'lodash'
import dbConf from '../configuration/ConfigureDatabase'
import {genericFindAll, parseRecords} from './utils'
export const createCountry = async (input)=> {
    try{
        const session = dbConf.createSession();
        const country = await session.run(
            'MATCH (country:Country{name: $country}) RETURN country',
            { country: input.countryName }
        )
        const singleRecord = country.records;
        await dbConf.closeSession()
        // if(!isEmpty(singleRecord)) {

        // }
            return singleRecord;
        // Make sure to include the protocol in the hostnamed

    } catch(e) {
        console.log(e)
    }
}

export const createUser = async (input) => {
    try {
        const session = dbConf.createSession();
        const genericUserAll = genericFindAll(session, 'User', {userName: input.userName})

        const getUsers = await genericUserAll
            .then(result => result.records.map(record => record))
            .catch(e => e)
            .then(result => parseRecords(result))
        console.log(getUsers)

        await dbConf.closeSession();
        return getUsers;
    } catch(e) {
        console.log(e)
    }
}