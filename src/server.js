const express = require('express');
const log = require('console-log-level')({level: 'trace'});
const graphqlHTTP = require('express-graphql');
const { GraphQLSchema } = require('graphql');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Query } = require('./query.js');
const singup = require('./auth/singup.js');
const singin = require('./auth/singin.js');
const configs = require('../env-configs.json');

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/singin', singin);

app.post('/singup', singup);

// Define the GraphQL Schema
const schema = new GraphQLSchema({
  query: Query
});

// Setup the nodejs GraphQL server
app.use('/', graphqlHTTP((req, res) => ({
    schema: schema,
    context: { request: req, response: res },
    graphiql: configs.app.graphiql
  })
));

app.listen(configs.app.port);
log.info(`Server Running at localhost:${configs.app.port}`);
