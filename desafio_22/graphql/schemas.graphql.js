import { makeExecutableSchema } from '@graphql-tools/schema'
import { graphqlHTTP } from 'express-graphql'
import { resolvers } from './resolvers.graphql.js'
import { types } from './types.graphql.js'

const graphQLSchema = makeExecutableSchema({
    typeDefs: types,
    resolvers: resolvers
})

export default graphqlHTTP({ 
    graphiql: true, 
    schema: graphQLSchema 
})