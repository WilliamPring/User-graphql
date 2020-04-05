const neo4j = require('neo4j-driver')

import {isEmpty} from 'lodash'
import { Connection, greaterThan } from 'cypher-query-builder';
import dbConf from '../configuration/ConfigureDatabase'

export const createCountry = async (input)=> {
    try{
        const session = dbConf.createSession();
        const country = await session.run(
            'MATCH (country:Country{name: $country}) RETURN country',
            { country: input.countryName }
        )
        const singleRecord = country.records;
        await dbConf.closeSession()
        if(!isEmpty(singleRecord)) {

        }

        // Make sure to include the protocol in the hostnamed

    } catch(e) {
        console.log(e)
    }
}


export const createUser = async (input) => {
    try {
        console.log(input)
        const session = dbConf.createSession();
        const country = await session.run(
            'MATCH (user:User{userName: $userName}) RETURN user',
            { userName: input.userName }
        )
        const singleRecord = country.records[0];
        console.log(singleRecord)
        if(isEmpty(singleRecord)) {
            //Create User here

        }
        await dbConf.closeSession();
    } catch(e) {
        console.log(e)
    }
}