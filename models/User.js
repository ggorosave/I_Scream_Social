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
                    return /^([\w\_\-\.])+@([\w\-]+\.)+([\w\-]{2,4})$/i.test(v);
                },
                message: 'Not a valid email!'
            }
        },
        // screams - reference screams
        screams: {
            type: Schema.Types.ObjectId,
            ref: 'scream',
        },
        // friends - reference users here (self-reference)
        friends: {
            type: Schema.Types.ObjectId,
            ref: 'user',
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
// TODO: fix
// userSchema
//     .virtual('friendCount')
//     .get(async function () {
//         friendsLength = await this.friends.length;
//         return friendsLength;
//     });

// creates collection using userSchema for the model
const User = model('user', userSchema);

// exports User model
module.exports = User;