const envConfigs = require('../env-configs.json');
const express = require('express');
const configs = require('./configs.js');
const log = require('console-log-level')({ level: configs.logLevel });
const graphqlHTTP = require('express-graphql');
const { GraphQLSchema } = require('graphql');
const { Query, Mutation } = require('./query.js');
const cors = require('cors');

const app = express();

// Define the GraphiQL Schema
const schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation,
});

app.use(cors());

// Setup the GraphQL server
app.use(
    '/',
    graphqlHTTP((req, res) => ({
        schema: schema,
        graphiql: configs.graphiql,
        context: { request: req, response: res },
    }))
);

app.listen(envConfigs.port);
log.info(`Server Running at localhost:${envConfigs.port}`);
