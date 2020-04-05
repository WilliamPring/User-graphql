import util from 'util';
import {reduce} from 'lodash'
export const genericReadAll = (session, nodeType) => {
    return session.readTransaction(txc => {
        const queryString = `MATCH (generic: ${nodeType}) RETURN generic`;
        const result = txc.run(queryString)
        return result;
    });
}

export const genericFindAll =  async (session, nodeType, param) => {
    const genericSerachParameters = genericParamGeneratorQuerry(param)
    console.log(genericSerachParameters)
    return session.readTransaction(async txc => {
        const queryString = `MATCH (generic: ${nodeType} ${genericSerachParameters}) RETURN generic`.replace(/'/g, '');
        const result = await txc.run(queryString, {...param})
        return result;
    });
}

// export const genericInsert = async (session, NodeType, param) => {

// };
// export const genericMerge = async (session, NodeType, relationship, param) => {

// }
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