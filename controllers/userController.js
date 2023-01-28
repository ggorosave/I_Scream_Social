/*
1. import ObjectId API from mongoose types
2. import user and scream models
3. create wrap all contoller methods in a module export
4. method to get all users
5. method to get a single user by id with screams and friend data populated
6. method to post a new user
7. method to update a user
8. method to delete a user (remove a users associated thoughts when deleted)
*/

const { ObjectId } = require('mongoose').Types;
// Change back later?
// const { User, Scream } = require('../models');
const User = require('../models/User');
const Scream = require('../models/Scream');

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
    // Untested
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .populate('screams', 'friends')
            .then((user) => !post ? res.status(404).json({ message: 'Could not find user with the given ID!' }) : res.json(user))
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
    // Untested
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
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
    // Untested
    deleteUser(req, res) {

        // finds user by id
        User.findOneAndRemove({ _id: req.params.userId })
            .then((user) => {
                !user
                    ? res.status(404).json({ message: 'Could not find user with the given ID!' })

                    // finds screams with the associated user id
                    : Scream.findOneAndUpdate(
                        { users: req.params.userId },

                        // removes scream with the associated user id
                        { $pull: { users: req.params.userId } },
                        { new: true }
                    )
            })
            .then((scream) => {
                !scream
                    ? res.status(404).json({ message: 'Could not find screams with the given user ID!' })
                    : res.json({ message: 'User successfully deleted' })
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // UNTESTED
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
    // UNTESTED
    removeFriend(req, res) {
        user.findOneAndUpdate(
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