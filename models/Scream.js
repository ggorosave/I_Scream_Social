// imports Schema and model APIs from mongoose
const { Schema, model } = require('mongoose');
// imports dayjs
const dayjs = require('dayjs');
// imports reactionSchema
const reactionSchema = require('./Reaction')

// Schema to create Scream model
const screamSchema = new Schema(
    {
        screamText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
        },
        // importz reactions subdoc and set them in an array here
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

// getter method to change the format of the timestamp
screamSchema.path('createdAt').get(function (v) { return dayjs(v).format('MM/DD/YYYY') });

// virtual to retrieve the length of the reactions
screamSchema.virtual('reactionCount').get(function () { return this.reactions.length }); 

// creates collection using schema for model
const Scream = model('scream', screamSchema);

module.exports = Scream;