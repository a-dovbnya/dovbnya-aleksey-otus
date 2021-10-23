import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import cors from 'cors'
import { schema } from './schema.mjs'
import { resolvers } from './resolvers.mjs'

const app = express()
app.use(cors())

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: resolvers
}))

app.listen(5000, () => console.log('server started on port 5000'))