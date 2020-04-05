//const neo4j = require('neo4j-driver')
import {int, Date } from 'neo4j-driver'
import {isEmpty} from 'lodash'
import dbConf from '../configuration/ConfigureDatabase'
import {genericReadAll, genericFindAll, genericParamGeneratorQuerry} from './utils'
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
        const genericUserAll = genericFindAll(session, 'User', {userName: input.userName, name: input.name})

        const getUsers = genericUserAll
            .then(result => {
                console.log(result)
                return result
            }).catch(e => {
                console.log(e)
            }).then(() => {
                console.log('end')
            })
        console.log(getUsers)
        // if(isEmpty(singleRecord)) {
        //     //Create User here
        //     // const user = await session.run(
        //     //   "CREATE (user:User{userName: $userName, born: $born, name: $name, bio: $bio}) RETURN user",
        //     //   { userName: input.userName, born: input.born, name: input.name, bio: input.bio }
        //     // );
        //     // console.log(user.records.);
        // }
        await dbConf.closeSession();
        return null;
    } catch(e) {
        console.log(e)
    }
}