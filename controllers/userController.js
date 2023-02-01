// Change back later?
const { User, Scream } = require('../models');



module.exports = {

    // method to get all users
    getUsers(req, res) {

        // used the find method to get all user data
        User.find()
            // then async function to return user data in json format
            .then((user) => res.json(user))
            // catches errors
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .populate(['screams', 'friends'])
            .then((user) => !user ? res.status(404).json({ message: 'Could not find user with the given ID!' }) : res.json(user))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            // updates using what's in the body
            { $set: req.body },
            { new: true }
        )
            .then((user) => !user
                ? res.status(404).json({ message: 'Could not find user with the given ID!' })
                : res.json(user)
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    deleteUser(req, res) {

        Scream.deleteMany({ userId: req.params.userId })
            .then((data) => 
                !data
                    ? res.status(404).json({ message: 'Could not find screams with the given user id!' })
                    : User.findOneAndRemove({ _id: req.params.userId })
            )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'Could not find user with the given ID!' })
                    : res.json({ message: 'User deleted!'})
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .then((user) => !user
                ? res.status(404).json({ message: 'Could not find user with the given ID!' })
                : res.json(user)
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .then((user) => !user
                ? res.status(404).json({ message: 'Could not find user with the given ID!' })
                : res.json(user)
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    }
};