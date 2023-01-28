const { ObjectId } = require('mongoose').Types;
const Scream = require('../models/Scream');

module.exports = {
    getScreams(req, res) {
        Scream.find()
            .then((screams) => res.json(screams))
            .catch((err) => res.status(500).json(err));
    }
};