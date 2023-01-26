// 1. import mongoose
// 2. require subdoc?
// 3. build schema
// 4. virtuals?
// 5. create model (collection)
// 6. export model

// imports Schema and model APIs from mongoose
const { Schema, model } = require('mongoose');
// imports dayjs
const dayjs = require('dayjs');

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
        // import reactions subdoc and set them in an array here
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

// creates collection using schema for model
const Scream = model('scream', screamSchema);

module.exports = Scream;