const { ObjectId } = require('mongoose').Types;
const Scream = require('../models/Scream');

module.exports = {
    // UNTESTED
    getScreams(req, res) {
        Scream.find()
            .then((screams) => res.json(screams))
            .catch((err) => res.status(500).json(err));
    },
    getSingleScream(req, res) {
        Scream.findOne({ _id: req.params.screamId })
            .then((scream) =>
                !scream
                    ? res.status(404).json({ message: 'Could not find a scream with the given ID' })
                    : res.json(scream)
            )
            .catch((err) => res.status(500).json(err));
    },
    createScream(req, res) {
        Scream.create(req.body)
            .then((scream) => res.json(scream))
            .catch((err) => res.status(500).json(err));
    },
    // updateScream
    // deleteScream
    // addReaction
    // removeReaction
};