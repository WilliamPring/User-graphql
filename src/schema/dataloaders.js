//const neo4j = require('neo4j-driver')
import {isEmpty} from 'lodash'
import dbConf from '../configuration/ConfigureDatabase'
import {genericFindAll, parseRecords, genericInsert} from './utils'
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
        const getUsers = await genericFindAll(session, 'User', {userName: input.userName})
        console.log(getUsers)
        if(!isEmpty(getUsers)) return null
        //generate user and return it
        const createUser = await genericInsert(session, 'User', input)
        await dbConf.closeSession();
        console.log('user create', createUser)
        return createUser[0];
    } catch(e) {
        console.log(e)
        return null;
    }
}

export const createFollowing = async (input) => {
    return input;
}