const jwt = require('jwt-simple');
const auth = require('./auth.js');
const Users = require('./models').Users;
const envConfigs = require('../env-configs.json');
const configs = require('./configs.js');
const log = require('console-log-level')({ level: configs.logLevel });

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
} = require('graphql');
const { _itemsList, _filtersList, _userType } = require('./types.js');

const allFiltersData = require('../program_data/filters.json');
const allProgramsData = require('../program_data/items.json');
const items = allProgramsData.items;

// Define the Query
const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        allItems: {
            type: _itemsList,
            args: {
                workoutTypes: { type: new GraphQLList(GraphQLString) },
                trainers: { type: new GraphQLList(GraphQLString) },
                programIntensity: { type: new GraphQLList(GraphQLString) },
                time: { type: new GraphQLList(new GraphQLList(GraphQLInt)) },
            },
            resolve: function(source, args) {
                return (function(args, items) {
                    return items
                        .filter(function(item) {
                            if (args.workoutTypes !== undefined) {
                                return item.workoutType.some(type =>
                                    args.workoutTypes.includes(type.title)
                                );
                            } else {
                                return item;
                            }
                        })
                        .filter(function(item) {
                            if (args.trainers !== undefined) {
                                return item.trainers.some(trainer =>
                                    args.trainers.includes(trainer.title)
                                );
                            } else {
                                return item;
                            }
                        })
                        .filter(function(item) {
                            if (args.programIntensity !== undefined) {
                                return args.programIntensity.includes(
                                    item.programIntensity.title
                                );
                            } else {
                                return item;
                            }
                        })
                        .filter(function(item) {
                            if (args.time !== undefined) {
                                return args.time.some(function(t) {
                                    if (
                                        t[0] > item.workoutDurationMaximum.id ||
                                        t[1] < item.workoutDurationMinimum.id
                                    ) {
                                        return false;
                                    }
                                    return true;
                                });
                            } else {
                                return item;
                            }
                        });
                })(args, items);
            },
        },
        allFilters: {
            type: _filtersList,
            resolve() {
                return allFiltersData;
            },
        },
        getCurrentUser: {
            type: _userType,
            resolve(source, args, context) {
                const currentUserID = auth(context);
                if(currentUserID) {
                    return Users.findById(currentUserID);
                } else {
                    return null;
                }
            },
        },
        singin: {
            type: GraphQLString,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString },
            },
            resolve(source, args, context) {
                return Users.findOne({ email: args.email }).then(user => {
                    if (user) {
                        try {
                            if (user.verifyPassword(args.password)) {
                                const payload = { currentUserID: user.id };
                                const token = jwt.encode(
                                    payload,
                                    envConfigs.secret
                                );
                                return token;
                            } else {
                                context.response.status(400);
                                return 'Incorrect password.';
                            }
                        } catch (e) {
                            log.info(e.message);
                            context.response.status(500);
                            return 'Please log in again.';
                        }
                    } else {
                        context.response.status(400);
                        return 'Email address does not exist.';
                    }
                });
            },
        },
    },
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        singup: {
            type: GraphQLString,
            args: {
                name: { type: GraphQLString },
                surname: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString },
            },
            resolve(source, args, context) {
                const newUser = new Users({
                    name: args.name,
                    surname: args.surname,
                    password: args.password,
                    email: args.email,
                });
                return Users.findOne({ email: args.email }).then(user => {
                    if (user) {
                        context.response.status(400);
                        return 'This email address is already used in the account.';
                    } else {
                        return newUser
                            .save()
                            .then(function(user) {
                                if (user) {
                                    return `Welcome ${user.name}`;
                                }
                            })
                            .catch(function(err) {
                                log.info(err);
                                context.response.status(400);
                                return 'Registration failed.';
                            });
                    }
                });
            },
        },
    },
});

exports.Query = Query;
exports.Mutation = Mutation;
