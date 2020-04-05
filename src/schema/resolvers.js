import {createCountry, createUser}  from './dataloaders'
export default ({
    Query: {
      hello: () => 'world'
    },
    Mutation: {
      CreateCountry: (_, {input} ) => {
        const jsonInput = JSON.parse(JSON.stringify(input));
        createCountry(jsonInput)
      },
      CreateUser: (_, {input} ) => {
        const jsonInput = JSON.parse(JSON.stringify(input));
        createUser(jsonInput)
      }
    }
})