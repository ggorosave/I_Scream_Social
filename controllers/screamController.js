const { ObjectId } = require('mongoose').Types;
const Scream = require('../models/Scream');

module.exports = {
    // UNTESTED
    getScreams(req, res) {
        Scream.find()
            .then((screams) => res.json(screams))
            .catch((err) => res.status(500).json(err));
    },
    createScream(req, res) {
        Scream.create(req.body)
    }
    // getSingleScream
    // updateScream
    // deleteScream
    // addReaction
    // removeReaction
};