// 1. import mongoose
// 2. require subdoc?
// 3. build schema
// 4. virtuals?
// 5. create model (collection)
// 6. export model

// // imports Schema and Types APIs from mongoose
const { Schema, Types } = require('mongoose');
// imports dayjs
const dayjs = require('dayjs');

const reactionSchema = new Schema(

    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    },
);

// getter method to change the format of the timestamp
reactionSchema.path('createdAt').get(function (v) { return dayjs(v).format('MM/DD/YYYY') });

module.exports = reactionSchema;