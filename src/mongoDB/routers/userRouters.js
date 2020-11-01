const express = require('express')
const User = require('./../models/user')
const router = new express.Router()


const sendResponse = (response, data, msg, statusCode) => {
    return response.status(statusCode).json({
        msg: msg,
        data,
    });
};

const randomId = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
};

router.post('/quiz/:username/create', async (req, res) => {
    if (!req.params.username) {
        return sendResponse(res, null, 'No username was entered', 400);
    }
    const userName = req.params.username;
    const userId = randomId();
    const newProfile = {
        name: userName,
        id: userId
    };
    try {
        const user = new User(newProfile);
        await user.save()
        return sendResponse(res, user, 'create base obj user', 200);
    } catch (e) {
        return sendResponse(res, e, 'cant create base obj user', 400);
    }
})

router.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        return sendResponse(res, users, 'view all users', 200);
    } catch (e) {
        return sendResponse(res, e, '', 500);
    }
})

router.get('/users/:id', async (req, res) => {
    console.log(req.params.id);
    const id = req.params.id;
    try {
        const user = await User.findById(id)

        if (!user) {
            return sendResponse(res, null, 'Cant find this user by id ', 404);
        }
        return sendResponse(res, user, 'Get user by id', 200);

    } catch (e) {
        return sendResponse(res, e, 'Fails', 500);
    }
})

router.patch('/user/:id/update', async (req, res) => {
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

const updates = Object.keys(req.body)
const allowedUpdates = ['name', 'email', 'password', 'age']
const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' })
}

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

router.delete('/delete/user/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            return sendResponse(res, user, 'Can`t find user', 404);
        }
        return sendResponse(res, user, 'Delete user', 200);

    } catch (e) {
        return sendResponse(res, e, '', 500);
    }
})

module.exports = router