const express = require('express');
const Quiz = require('../models/quiz')
const router = new express.Router();


router.get('/quiz', async (req, res) => {
    try {
        const dataJSON = readFile("quiz.json");
        return sendResponse(res, dataJSON, 'view all quiz', 200);
    } catch (error) {
        throw error;
    }
    // try {
    //     const restauarants = await Restauarant.find({});
    //     res.status(200).send(restauarants)
    // } catch (err) {
    //     res.status(400).send(err)
    // }
})


router.post('/quiz/createQuiz', async (req, res) => {
    const { question, answer1, answer2, answer3, answer4 } = req.body;
    if (!question || !answer1 || !answer2 || !answer3 || !answer4) {
        return sendResponse(res, null, 'Please provide question and answers', 400);
    }
    const dataJSON = readFile("quiz.json");
    const found = dataJSON.some(el => el.question === question);
    if (found) {
        return sendResponse(res, null, 'Question already exists', 400);
    }
    const newQuiz = {
        question,
        answer1,
        answer2,
        answer3,
        answer4
        // id: text.length + 1
    };
    dataJSON.push(newQuiz);                             //push obj to array
    console.log('dataJSON', dataJSON)                    //print the array
    writeFileQA("quiz.json", JSON.stringify(dataJSON))     //write to the file the new array with the new obj
    return sendResponse(res, dataJSON, 'create obj QA', 200);
})



router.delete('/deleteQuizById/:id', async (req, res) => {

    const id = parseInt(req.query.id);
    if (!id) {
        return sendResponse(res, null, 'please provide id', 400);
    }
    const dataJSON = readFile("quiz.json");
    const indexRemove = dataJSON.findIndex(item => item.id === id)
    dataJSON.splice(indexRemove, 1);

    writeFileQA("quiz.json", JSON.stringify(dataJSON))     //write to the file the new array with the new obj
    return sendResponse(res, dataJSON, 'The object quiz was successfully deleted', 200);
    // try {
    //     const restObj = await Restaurant.findByIdAndDelete(req.params.id);
    //     if (!restObj) {
    //         res.status(404).send('cant delete object')
    //     }
    //     res.status(200).send( restObj)
   
})

router.put('/updateQuizById/:id', async (req, res) => {
    const id = parseInt(req.query.id);
    if (!id) {
        return sendResponse(res, null, 'please provide id', 400);
    }

    const dataJSON = readFile("quiz.json");
    const indexRemove = dataJSON.findIndex(item => item.id === id)
    dataJSON.splice(indexRemove, 1);

    const newQuiz = {
        id: id,
        question: req.body.question,
        answer1: req.body.answer1,
        answer2: req.body.answer2,
        answer3: req.body.answer3,
        answer4: req.body.answer4,
        answer5: req.body.answer5
    };

    dataJSON.push(newQuiz);                             //push obj to array
    dataJSON.sort(function (a, b) {
        return a.id - b.id
    });
    writeFileQA("quiz.json", JSON.stringify(dataJSON))     //write to the file the new array with the new obj
    return sendResponse(res, dataJSON, 'The object quiz was successfully update', 200);
    // try {
    //     const restObj = await Restaurant.findByIdAndDelete(req.params.id);
    //     if (!restObj) {
    //         res.status(404).send('cant delete object')
    //     }
    //     res.status(200).send( restObj)
    // } catch (err) {
    //     res.status(400).send(err)
    // }
})

module.exports = router






