const express = require('express')
const User = require('./../models/user')
const router = new express.Router()

router.post('/quiz/:username/create', async (req, res) => {
    if (!req.params.username) {
        return sendResponse(res, null, 'No username was entered', 400);
    }
    const userName = req.params.username;
    const userId = randomId();
    const newProfile = { name: userName, id: userId };
    writeFileUser(userName, JSON.stringify(newProfile));
    return sendResponse(res, newProfile, 'create base obj User', 200);
   
    // const user = new User(req.body)
    // try {
    //     await user.save()
    //     res.status(201).send(user)
    // } catch (e) {
    //     res.status(400).send(e)
    // }
})

router.get('/quiz/:username', async (req, res) => {
    if (!req.params.username) {
        return sendResponse(res, null, 'no user name was given', 400);
    }
    const userName = req.params.username;
    const user = readFileUser(userName);
    return sendResponse(res, user, 'view profile user ', 200)
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

router.patch('/quiz/:username/update', async (req, res) => {
    if (!req.params.username) {
        return sendResponse(res, null, 'No username was entered', 400);
    }
    if (!req.body) {
        return sendResponse(res, null, 'no user answers', 400)
    }
    const userName = req.params.username;
    const userAnswers = req.body;

    const user = readFileUser(userName);                //get the files user
    user.userAnswers = userAnswers;                 //add more property to user of userAnswers that his info come from req.body
    writeFileUser(userName, JSON.stringify(user));
    return sendResponse(res, user, 'User answers updated ', 200)

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