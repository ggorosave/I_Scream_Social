// 2. require subdoc?
// 3. build schema

// imports Schema and model APIs from mongoose
const { Schema, model } = require('mongoose');

// Schema to create user model
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function (v) {
                    return /^([\w-_\.])+@([\w-]+\.)+([\w-]{2,4}])$/i.test(v);
                },
                message: 'Not a valid email!'
            }
        },
        // screams - reference screams
        screams: {
            type: Schema.Types.ObjectId,
            ref: 'Scream',
        },
        // friends - reference users here (self-reference)
        friends: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false,
    }
);

// virtual to retrieve the length of the user's friends
userSchema
    .virtual('friendCount')
    .get(function () {
        return this.friends.length;
    });

// creates collection using userSchema for the model
const User = model('user', userSchema);

// exports User model
module.exports = User;