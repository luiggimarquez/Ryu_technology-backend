import { makeExecutableSchema } from '@graphql-tools/schema' 
import { types } from './types.js'
import { resolvers } from './resolvers.js'
import { graphqlHTTP } from 'express-graphql'

const graphqlSchema =  makeExecutableSchema({

    typeDefs : types,
    resolvers

})

export default graphqlHTTP({
    graphiql : true,
    schema: graphqlSchema
})

 