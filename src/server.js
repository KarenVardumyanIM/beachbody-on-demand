//get all the libraries needed
const configs = require('../env-configs.json');
const express = require('express');
const log = require('console-log-level')({ level: configs.app.logLevel });
const graphqlHTTP = require('express-graphql');
const { GraphQLSchema } = require('graphql');
const { Query } = require('./query.js');
const cors = require('cors');

//setting up the port number and express app
const app = express();

// Define the Schema
const schema = new GraphQLSchema({
    query: Query,
});

app.use(cors());

//Setup the nodejs GraphQL server
app.use(
    '/',
    graphqlHTTP({
        schema: schema,
        graphiql: configs.app.graphiql,
    })
);

app.listen(configs.app.port);
log.info(`Server Running at localhost:${configs.app.port}`);
