import {createCountry, createUser, createFollowing, getUUID}  from './dataloaders'
export default ({
    Query: {
      hello: () => 'world',
      getUUID: async (_, {id}) => {
       const uuid = await getUUID(id);
        return uuid[0].uuid
      }
    },
    Mutation: {
      CreateCountry: (_, {input} ) => {
        const jsonInput = JSON.parse(JSON.stringify(input));
        createCountry(jsonInput)
      },
      CreateUser: async (_, {input} ) => {
        const jsonInput = JSON.parse(JSON.stringify(input));
        const data = await createUser(jsonInput);
        console.log(data)
        return data;
      },
      CreateFollowing: async (_, {input } ) => {
        console.log(input)
        const data = await createFollowing(input);
        return data;
      }
    }
})