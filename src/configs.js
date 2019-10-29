if (process.env.NODE_ENV === 'production') {
    module.exports.graphiql = false;
    module.exports.logLevel = 'warn';
} else if (process.env.NODE_ENV === 'development') {
    module.exports.graphiql = true;
    module.exports.logLevel = 'debug';
}
