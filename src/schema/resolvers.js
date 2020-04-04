export default ({
    Query: {
      hello: () => 'world'
    },
    Mutation: {
      CreateCountry: (_, {input} ) => {
        const jsonInput = JSON.parse(JSON.stringify(input));
        console.log(jsonInput)
      },
      CreateCity: (input) => console.log(input)
    }
})