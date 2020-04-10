import util from 'util';
import {reduce} from 'lodash'

export const genericFindAll =  async (session, nodeType, param) => {
    const genericSerachParameters = genericParamGeneratorQuerry(param)
    return session.readTransaction(async txc => {
        const queryString = `MATCH (generic: ${nodeType} ${genericSerachParameters}) RETURN generic`.replace(/'/g, '');
        const result = await txc.run(queryString, {...param})
        console.log(result)
        return parseRecords(result.records);
    });
}


export const genericInsert = async (session, nodeType, param) => {
    const genericSerachParameters = genericParamGeneratorQuerry(param)
    return session.writeTransaction(async txc => {
        const queryString = `CREATE (generic: ${nodeType} ${genericSerachParameters}) RETURN generic`.replace(/'/g, '');
        const result = await txc.run(queryString, {...param})
       // result.records.map(record => array.push(record.get(0).properties));
       return parseRecords(result.records);
    });
};

export const parseRecords = (records) => {
    return reduce(records.map(record => record.get(0)), (acc, value) => {
            acc.push(value.properties)
            return acc
    }, []);
}

const genericParamGeneratorQuerry = (param) => {
    let parmsObj = {};
    let queryParmObj = Object.keys(param);

    queryParmObj.map(key=> {
        parmsObj[key] = '$' + key;
    })
    //this will allow the object to be seen like a string without encapsing the key with a string
    return util.inspect(parmsObj);
}