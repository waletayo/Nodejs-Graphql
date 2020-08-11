const mongoose = require("mongoose").Schema;
const _mongoose_ = require("mongoose");
/**
 * @constructor
 * event constructor
 * */
const eventSchema = new mongoose({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
}, {timestamps: true});
const event_model = _mongoose_.model('event', eventSchema, 'Events');
module.exports = event_model;
