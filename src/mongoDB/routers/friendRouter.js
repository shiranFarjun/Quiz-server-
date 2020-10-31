const express = require('express')
const User = require('../models/user')
const router = new express.Router()


const calcScore = (obj1, obj2) => {
    let array1 = [];
    let array2 = [];
    for (i in obj1) {
        array1.push(obj1[i])
    }
    for (i in obj2) {
        array2.push(obj2[i])
    }
    var countMatched = 0
    for (let index = 0; index < array1.length; index++) {
        if (array1[index] == array2[index]) {
            countMatched++;

        }
router.post('/quiz/:username/answer/:friendName/create', async (req, res) => {

    if (!req.params.username) {
        return sendResponse(res, null, 'No username was entered', 400);
    }
    if (!req.params.friendName) {
        return sendResponse(res, null, 'Does not have the name of the user\'s friend', 400)
    }
    if (!req.body) {
        return sendResponse(res, null, 'No answers were received', 400)
    }
    const userName = req.params.username;
    const friendName = req.params.friendName;
    const fileName = `${userName}-${friendName}-results`;
    const newAnswer = req.body;

    const dataFriends = readFileUser(fileName);
    dataFriends.quizAnswers = { ...dataFriends.quizAnswers, ...newAnswer };
    writeFileUser(fileName, JSON.stringify(dataFriends));
    return sendResponse(res, dataFriends, 'The friend\'s answers have been updated', 200);

    // const user = new User(req.body)

    // try {
    //     await user.save()
    //     res.status(201).send(user)
    // } catch (e) {
    //     res.status(400).send(e)
    // }
})

router.get('/quiz/results/:username', async (req, res) => {

    if (!req.params.username) {
        return sendResponse(res, null, 'No username was entered', 400);
    }
    if (!req.params.friendName) {
        return sendResponse(res, null, 'Does not have the name of the user\'s friend', 400)
    }
    const userName = req.params.username;                         // the name of user (root)
    const friendName = req.params.friendName;
    const friendId = randomId();

    const fileName = `${userName}-${friendName}-results`;       // Create a folder for a friend with the name of the user he is answering the quiz on

    const newFriendUser = { name: friendName, id: friendId };

    writeFileUser(fileName, JSON.stringify(newFriendUser));
    return sendResponse(res, newFriendUser, 'create friend user', 200);
    // try {
    //     const users = await User.find({})
    //     res.send(users)
    // } catch (e) {
    //     res.status(500).send()
    // }
})

// router.get('/users/:id', async (req, res) => {
//     const _id = req.params.id

//     try {
//         const user = await User.findById(_id)

//         if (!user) {
//             return res.status(404).send()
//         }

//         res.send(user)
//     } catch (e) {
//         res.status(500).send()
//     }
// })

router.patch('/quiz/:username/answer/:friendName/update', async (req, res) => {
    if (!req.params.username) {
        return sendResponse(res, null, 'No username was entered', 400);
    }
    if (!req.params.friendName) {
        return sendResponse(res, null, 'Does not have the name of the user\'s friend', 400)
    }
    if (!req.body) {
        return sendResponse(res, null, 'No answers were received', 400)
    }
    const userName = req.params.username;
    const friendName = req.params.friendName;
    const fileName = `${userName}-${friendName}-results`;
    const newAnswer = req.body;

    const dataFriends = readFileUser(fileName);
    dataFriends.quizAnswers = { ...dataFriends.quizAnswers, ...newAnswer };
    writeFileUser(fileName, JSON.stringify(dataFriends));
    return sendResponse(res, dataFriends, 'The friend\'s answers have been updated', 200);
    // const updates = Object.keys(req.body)
    // const allowedUpdates = ['name', 'email', 'password', 'age']
    // const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    // if (!isValidOperation) {
    //     return res.status(400).send({ error: 'Invalid updates!' })
    // }

    // try {
    //     const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

    //     if (!user) {
    //         return res.status(404).send()
    //     }

    //     res.send(user)
    // } catch (e) {
    //     res.status(400).send(e)
    // }
})

router.patch('/quiz/:username/answer/:friendName/getScore', async (req, res) => {
    if (!req.params.username) {
        return sendResponse(res, null, 'No username was entered', 400);
    }
    if (!req.params.friendName) {
        return sendResponse(res, null, 'Does not have the name of the user\'s friend', 400)
    }
    const userName = req.params.username;
    const friendName = req.params.friendName;
    const resultsFileNameFriend = `${userName}-${friendName}-results`;

    const friend = readFileUser(resultsFileNameFriend);
    const user = readFileUser(userName);
    friendAnswers = friend.quizAnswers;
    userAnswers = user.userAnswers;
    const score = calcScore(userAnswers, friendAnswers);        //output => { correct: 3, length: 4 }

    if (!user.friendsScore) {
        user.friendsScore = [];                           //create new property in user with name 'friendsScore'
    }
    user.friendsScore.push({                             //in property at user name with the name 'friendsScore' i create obj {friendName: friendName, score: score.correct}
        friendName: friendName,
        score: score.correct
    });
    friend.correctAnswers = score.correct;                // create property on friend with name correctAnswer 
    writeFileUser(userName, JSON.stringify(user));
    writeFileUser(resultsFileNameFriend,JSON.stringify( friend));

    const data= score.correct+'/'+score.length;                //exmple: 3/5
    return sendResponse(res,data, 'The score is : ', 200);
})


// router.delete('/users/:id', async (req, res) => {
//     try {
//         const user = await User.findByIdAndDelete(req.params.id)

//         if (!user) {
//             return res.status(404).send()
//         }

//         res.send(user)
//     } catch (e) {
//         res.status(500).send()
//     }
// })

module.exports = router