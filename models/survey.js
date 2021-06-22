const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const surveySchema = new Schema({
    title: {
        type: String,
    },
    questions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'question'
        }
    ],
    token: {
        type: String
    },
    author: {
        type: String
    },
    created: {
        type: Number
    }
});


module.exports = mongoose.model('survey', surveySchema, 'survey');



