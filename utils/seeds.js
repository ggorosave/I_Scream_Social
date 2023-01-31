// add other data.js files to utils?
const connection = require('../config/connection');
// const { User, Scream } = require('../models');
const User = require('../models/User');
const Scream = require('../models/Scream');
const { insertMany } = require('../models/User');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    // delete all screams and users
    await Scream.deleteMany({});
    await User.deleteMany({});

    // insertMany into users, screams, and reactions


});