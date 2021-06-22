const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    title: {
        type: String,
    },
    content: {
        type: String,
    },
    category: {
        type: String
    },
    options: [
        {
            type: String,
        }
    ],
    author: {
        type: String
    },
    lastUpdated: {
        type: Number
    },
});


module.exports = mongoose.model('question', questionSchema, 'question');





