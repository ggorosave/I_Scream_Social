// imports connect method and connection object from mongoose
const { connect, connection } = require('mongoose');

// creates connection to mongoDB localhost
connect('mongodb://localhost:27017/iScreamSocialDB', {
    // Delete? These options are outdated?
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// exports connection
module.exports = connection;