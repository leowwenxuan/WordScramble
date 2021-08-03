const express = require('express');
const cors = require('cors');
var ScrambleGame = require("./scrambleWord");
var app = express()
app.use(cors())
app.use(express.json())

const start = new ScrambleGame();
app.post("/", (req, res, next) => {
    const rndword = start.shuffle()
    return res.send({
        word: rndword,
    })
})
app.post("/reset", (req, res, next) => {
    const reset = start.reset();
    const rndword = start.shuffle()
    return res.send({
        word: rndword,
        score: 0,
        lives: 5
    })
})

app.put("/", (req, res, next) => {
    const guess = req.query.guess;
    if (!isNaN(guess)) {
        res.send({
            error: "ERROR ERROR ERROR"
        })
    }

    const answer = start.guess(guess);
    console.log(answer);
    return res.send(start.progress());
});


// listening to port 8080
const port = process.env.PORT
app.listen(port, () => {
    console.log("listening on Port " + port);
});
