const mongoose = require('mongoose');


const Quiz = mongoose.model('quiz', {
    id: {
        type: String,
    },
    question: {
        type: String,
    },
    answer1: {
        type: String,
    },
    answer2: {
        type: String,
    },
    answer3: {
        type: String,
    }, 
    answer4: {
        type: String,
    }
})

module.exports = Quiz