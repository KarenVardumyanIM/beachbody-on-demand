if (process.env.NODE_ENV === 'production') {
    module.exports = {
        graphiql: false,
        logLevel: 'warn',
    };
} else if (process.env.NODE_ENV === 'development') {
    module.exports = {
        graphiql: true,
        logLevel: 'debug',
    };
}
