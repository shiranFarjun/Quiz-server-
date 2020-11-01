const mongoose = require('mongoose');



const User = mongoose.model('user', {
    id: {
        type: String
        // validate: [randomId, 'not a validate id']
    },
    name: {
        type: String,
        required: true
    },
    userAnswers: {
        q1: {
            type: String,    //"1"
            default: "0"
        },
        q2: {
            type: String,    //"2"
            default: "0"
        },
        q3: {
            type: String,    //"2"
            default: "0"
        },
        q4: {
            type: String,    //"3"
            default: "0"
        }
    }
})

module.exports = User