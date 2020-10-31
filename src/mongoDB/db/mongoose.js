const mongoose = require('mongoose');
// const Quiz = require('./../models/quiz')
const User = require('./../models/user')
mongoose.connect('mongodb://127.0.0.1:27017/quizGame', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false

})

const obj1 = new User({
    name: 'S&F'

})

obj1.save().then(() => {
    console.log(obj1);
}).catch((error) => {
    console.log('Error', error);
})
