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
// const { User, Scream } = require('../models/User');
const User = require('../models/User');

module.exports = {

    // method to get all users
    getUsers(req, res) {

        // used the find method to get all user data
        User.find()
            // then async function to return user data in json format
            .then((user) => {
                // DELETE? or put everything in an object first before returning
                // const userObj = {
                //     user,
                // };

                // returns the user data as a javascript object (looks like JSON)
                return res.json(user);
            })
            // catches errors
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // getSingleUser
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
};