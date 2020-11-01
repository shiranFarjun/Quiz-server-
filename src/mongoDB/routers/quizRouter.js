const express = require('express');
const Quiz = require('../models/quiz')
const router = new express.Router();


const sendResponse = (response, data, msg, statusCode) => {
    return response.status(statusCode).json({
        msg: msg,
        data,
    });
};

router.get('/quiz', async (req, res) => {
    try {
        const dataJSON = await Quiz.find({});
        return sendResponse(res, dataJSON, 'view all quiz', 200);
    } catch (error) {
        throw error;
    }
})

router.post('/quiz/createQuiz', async (req, res) => {
    const { id,question, answer1, answer2, answer3, answer4 } = req.body;
    if (!id ||!question || !answer1 || !answer2 || !answer3 || !answer4) {
        return sendResponse(res, null, 'Please provide question and answers', 400);
    }
    const dataJSON = await Quiz.find({});
    const found = dataJSON.some(el => el.question === question);
    if (found) {
        return sendResponse(res, null, 'Question already exists', 400);
    }
    const newQuiz = {
        id,
        question,
        answer1,
        answer2,
        answer3,
        answer4
    };
    const quiz=new Quiz(newQuiz);
    await quiz.save();
    return sendResponse(res, quiz, 'create obj QA', 200);
})

router.delete('/deleteQuizById/:_id', async (req, res) => {
    const _id = req.params._id;
    if (!_id) {
        return sendResponse(res, null, 'please provide id', 400);
    }
    const dataJSON = await Quiz.findByIdAndDelete(_id);
    if (!dataJSON) {
        return sendResponse(res, null, 'Cant find and delete object with this id', 404);
    }
    return sendResponse(res, dataJSON, 'The object quiz was successfully deleted', 200);
})

router.patch('/updateQuizById/:_id', async (req, res) => {
    const _id = req.params._id;
    if (!_id) {
        return sendResponse(res, null, 'please provide id', 400);
    }
    const updates = Object.keys(req.body)
    const allowedUpdates = ['id','question', 'answer1', 'answer2', 'answer3','answer4']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))  
    if (!isValidOperation) {
        return sendResponse(res, null, 'Invalid updates!', 400);
    }
    try {
        const quiz = await Quiz.findByIdAndUpdate(_id, req.body,{ new: true}) 
        if (!quiz) {
            return sendResponse(res, null, 'quiz is empty', 404);          
        }
        return sendResponse(res, quiz, 'The object quiz was successfully update', 200);
    } catch (e) {
        res.status(400).send(e)
    }

})

module.exports = router






