//get all the libraries needed
const express = require('express');
const log = require('console-log-level')({level: 'trace'});
const graphqlHTTP = require('express-graphql');
const { GraphQLSchema } = require('graphql');
const { Query } = require('./query.js');
const cors = require('cors');
const configs = require('../env-configs.json');

const mongoose = require('./mongoose.js');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport')

//setting up the port number and express app
const app = express();


//save sessions data on database
app.use(session({
    store: new MongoStore({
      mongooseConnection: mongoose.connection
    }),
    secret: "dsafdafs",
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())


// Define the Schema
const schema = new GraphQLSchema({
  query: Query
});

app.use(cors());

//Setup the nodejs GraphQL server
app.use('/', graphqlHTTP({
    schema: schema,
    graphiql: configs.app.graphiql
  })
);

app.listen(configs.app.port);
log.info(`Server Running at localhost:${configs.app.port}`);
