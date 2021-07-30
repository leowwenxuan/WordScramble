const express = require('express');
const cors = require('cors');
var ScrambleGame = require("../backend/scrambleWord");
var app = express()
app.use(cors())
app.use(express.json())
// var rnword = ScrambleGame.getrandomWords()
// var sw = ScrambleGame.shuffle(rnword);
// let score = 0;
// let lives = 5;

// app.post("/", (req, res, next) => {
//     var rnword = ScrambleGame.getrandomWords()
//     var sw = ScrambleGame.shuffle(rnword);
//     console.log(sw);
//     return res.send({
//         word: sw,
//     })
// })

// app.put("/", (req, res, next) => {
//     const guess = req.query.guess;
//     const answer = ScrambleGame.checkAnswer(guess)
//     console.log(answer);
//     if (!isNaN(guess)) {
//         res.send({
//             error: "It's alphabets. How did you get number?. Are your eyes okay?"
//         })
//     }
//     return answer;
// });

const start = new ScrambleGame();
app.post("/", (req, res, next) => {
    const rndword = start.shuffle()
    // console.log(rndword);
    return res.send({
        word: rndword,
    })
})

app.put("/", (req, res, next) => {
    const guess = req.query.guess;
    if (!isNaN(guess)) {
        res.send({
            error: "It's alphabets. How did you get number?. Are your eyes okay?"
        })
    }
    // else {
    //     res.send({
    //         error: "what did you even typed?!"
    //     })
    // }

    const answer = start.guess(guess);
    console.log(answer);
    return res.send(start.progress());
});


// listening to port 8000
app.listen(8080, () => {
    console.log("listening on Port 8080");
});