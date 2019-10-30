const envConfigs = require('../env-configs.json');
const express = require('express');
const configs = require('./configs.js');
const log = require('console-log-level')({ level: configs.logLevel });
const graphqlHTTP = require('express-graphql');
const { GraphQLSchema } = require('graphql');
const { Query } = require('./query.js');
const cors = require('cors');

const app = express();

// Define the GraphiQL Schema
const schema = new GraphQLSchema({
    query: Query,
});

app.use(cors());

// Setup the nodejs GraphQL server
app.use(
    '/',
    graphqlHTTP({
        schema: schema,
        graphiql: configs.graphiql,
    })
);

app.listen(envConfigs.port);
log.info(`Server Running at localhost:${envConfigs.port}`);
