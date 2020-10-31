const mongoose = require('mongoose');
// const validator = require('validator')

const User = mongoose.model('user', {
    name: {
        type: String,
        required: true
    }
    
})

module.exports = User