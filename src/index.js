//get all the libraries needed
const express = require('express');
const log = require('console-log-level')({level: 'trace'});
const graphqlHTTP = require('express-graphql');
const { GraphQLSchema } = require('graphql');
const { Query } = require('./query.js');
const cors = require('cors');
const configs = require('../env-configs.json');

//setting up the port number and express app
const port = configs.prod.port;
const app = express();

// Define the Schema
const schema = new GraphQLSchema({
  query: Query
});

app.use(cors());

//Setup the nodejs GraphQL server
app.use('/', graphqlHTTP({
    schema: schema,
    graphiql: configs.prod.graphiql
  })
);

app.listen(port);
log.info(`Server Running at localhost:${port}`);
