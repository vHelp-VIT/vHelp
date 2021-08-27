const mongoose = require("mongoose")

const question  = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    category: {
        type: Object,
        require: true
    },
    answer: {
        type: Object,
        default: []
    },
    email: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('question2', question);