module.exports = ({
    Swagger: {
        swaggerApidocs: '/api/v1/api-docs',
        swaggerPath: '/'
    },
    GraphqlSchemaConfig: {
        query: true,
        mutation: true //Do not generate mutation make them yourself
      }
})