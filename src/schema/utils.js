import util from 'util';
import {reduce} from 'lodash'

export const genericFindAll =  async (session, nodeType, param) => {
    const genericSerachParameters = genericParamGeneratorQuerry(param)
    return session.readTransaction(async txc => {
        const queryString = `MATCH (generic: ${nodeType} ${genericSerachParameters}) RETURN generic`.replace(/'/g, '');
        console.log(queryString)
        const result = await txc.run(queryString, {...param})
        console.log(result)
        return parseRecords(result.records);
    });
}


export const genericInsert = async (session, nodeType, param) => {
    const genericSerachParameters = genericParamGeneratorQuerry(param)
    return session.writeTransaction(async txc => {
        const queryString = `CREATE (generic: ${nodeType} ${genericSerachParameters}) RETURN generic`.replace(/'/g, '');
        console.log(queryString)
        const result = await txc.run(queryString, {...param})
       // result.records.map(record => array.push(record.get(0).properties));
       return parseRecords(result.records);
    });
};

export const getUUIDBaseOnID = async (session, id) => {
    return session.writeTransaction(async txc => {
        const queryString = `MATCH (n) WHERE id(n)=${id} RETURN n`;
        console.log(queryString)
        const result = await txc.run(queryString)
        console.log(result)
        console.log(result.summary.query)
       // result.records.map(record => array.push(record.get(0).properties));
       return parseRecords(result.records);
    });
};

export const genericRelationShipMerge = async (session, {firstNodeType, secondNodeType}, relationshipType, param) => {
    const genericSerachParameters = genericParamGeneratorQuerry(param)
    return session.writeTransaction(async txc => {
        const queryString = `MATCH (firstGeneric: ${firstNodeType}), (secondGeneric: ${secondNodeType}) `;
        const result = await txc.run(queryString, {...param})
       // result.records.map(record => array.push(record.get(0).properties));
       return parseRecords(result.records);
    });
    return null;
};

// export const relationshipExist = async (session, firstNode, secondNode, relationshipType, filterParam) => {
//     const genericSerachParameters = genericParamGeneratorQuerry(filterParam)
//     return session.writeTransaction(async txc => {
//         const queryString = `MATCH (g0: { ${firstNode.NodeType} }, MATCH (g1: { ${secondNode.NodeType} }) RETURN EXIST((g0)-[:${relationshipType}]-(G1))`.replace(/'/g, '');
//         console.log(queryString)
//         const result = await txc.run(queryString, {...filterParam})
//        // result.records.map(record => array.push(record.get(0).properties));
//        return parseRecords(result.records);
//     });
// }
// MATCH  (p:User {uuid: '7536e16e-fb64-4003-a4ea-92d0667cc2d5'}), (b:User {uuid: '04603243-51c1-4b42-a00f-551a9440eda9'})
// RETURN EXISTS( (p)-[:FOLLOWING]-(b) )

// export const genericRelationShipDelete = async (session, {firstNodeType, secondNodeType}, relationshipType, param) => {
//     const genericSerachParameters = genericParamGeneratorQuerry(param)
//     return null;
// };

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