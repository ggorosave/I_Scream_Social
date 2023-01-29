const { ObjectId } = require('mongoose').Types;
const Scream = require('../models/Scream');
const User = require('../models/User');

module.exports = {
    // UNTESTED
    getScreams(req, res) {
        Scream.find()
            .then((screams) => res.json(screams))
            .catch((err) => res.status(500).json(err));
    },
    // UNTESTED
    getSingleScream(req, res) {
        Scream.findOne({ _id: req.params.screamId })
            .then((scream) =>
                !scream
                    ? res.status(404).json({ message: 'Could not find a scream with the given ID' })
                    : res.json(scream)
            )
            .catch((err) => res.status(500).json(err));
    },
    // UNTESTED
    createScream(req, res) {
        Scream.create(req.body)
            .then((scream) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { screams: scream._id } },
                    { new: true }
                );
            })
            .then((user) => 
                !user
                    ? res.status(404).json({ message: 'Scream created, but found no user with that ID'})
                    : res.json({ message: 'Scream created!'})
            )
            .catch((err) => res.status(500).json(err));
    },
    // UNTESTED
    updateScream(req, res) {
        Scream.findOneAndUpdate(
            { _id: req.params.screamId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((scream) =>
                !scream
                    ? res.status(404).json({ message: 'Could not find a scream with the given ID' })
                    : res.json(scream)
            )
            .catch((err) => res.status(500).json(err));
    },
    // UNTESTED
    deleteScream(req, res) {
        Scream.findOneAndDelete(
            { _id: req.params.screamId }
        )
            .then((scream) =>
                !scream
                    ? res.status(404).json({ message: 'Could not find a scream with the given ID' })
                    : res.json({ message: 'Scream successfully deleted' })
            )
            .catch((err) => res.status(500).json(err));
    },
    // UNTESTED
    addReaction(req, res) {
        Scream.findOneAndUpdate(
            { _id: req.params.screamId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((scream) =>
                !scream
                    ? res.status(404).json({ message: 'Could not find a scream with the given ID' })
                    : res.json(scream)
            )
            .catch((err) => res.status(500).json(err));
    },
    // UNTESTED
    removeReaction(req, res) {
        Scream.findOneAndUpdate(
            { _id: req.params.screamId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
            .then((scream) =>
                !scream
                    ? res.status(404).json({ message: 'Could not find a scream with the given ID' })
                    : res.json(scream)
            )
            .catch((err) => res.status(500).json(err));
    }
};