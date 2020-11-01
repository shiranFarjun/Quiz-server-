const express = require('express');
const cors = require("cors")
require('./db/mongoose');

const quizRouter=require('./routers/quizRouter');
const userRouter=require('./routers/userRouters');
// const friendRouter=require('./routers/friendRouter');

const app = express();
const port = process.env.PORT || 3003;

app.use(cors());
app.use(express.json());

app.use(quizRouter);
app.use(userRouter);
// app.use(friendRouter);


// /////////        User Request     /////////////

// app.get("/quiz/:username", quizControl.getUser);

// app.post("/quiz/:username/create", quizControl.createNewUser);

// app.put("/quiz/:username/update", quizControl.updateUserAnswers);



// /////// Request for friends   //////////////////

// app.post("/quiz/:username/answer/:friendName/create", quizControl.createNewFriend);

// app.put("/quiz/:username/answer/:friendName/update", quizControl.updateFriend);

// app.put("/quiz/:username/answer/:friendName/getScore", quizControl.getScore);

// app.get("/quiz/results/:username", quizControl.getResults);



app.listen(port, () => {
    console.log('Server of quiz game is up on port ' + port);
})