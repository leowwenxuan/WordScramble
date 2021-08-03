window.addEventListener('DOMContentLoaded', (event) => {
    // alert('DOM fully loaded and parsed');
    // storing the document ID into variables
    const guessBtn = document.getElementById("guess-button");
    const guessInput = document.getElementById("guess-input");
    const gameArea = document.getElementById("gameArea")
    const startBtn = document.getElementById("startBtn");
    const header = document.getElementById("header");
    const startArea = document.getElementById("startArea");
    const resetBtn = document.getElementById("reset-button");
    const word = document.getElementById("words");
    const score = document.getElementById("score");
    const lives = document.getElementById("lives");

    startBtn.addEventListener('click', () => {
        gameArea.classList.remove("hidden");
        header.classList.remove("hidden");
        startArea.remove();
        fetch(`https://ades-ca3-wordscramble.herokuapp.com/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then((response) => { return response.json() })
            .then((json) => {
                console.log(json.word);
                word.innerHTML = json.word;
            })
    });
    guessBtn.addEventListener('click', () => {
        const guess = guessInput.value;
        fetch(`https://ades-ca3-wordscramble.herokuapp.com/?guess=${guess}`, { method: 'PUT' })
            .then((response) => response.json())
            .then((json) => {
                if (guess == "") {
                    alert("Please type something in");
                }
                else {
                    // update the lives span
                    score.innerHTML = json[0];
                    // update the score span
                    lives.innerHTML = json[1];
                    // update the word
                    word.innerHTML = json[2];
                    // if lives reaches 0, display the losing msg and disable the button
                    if (json[1] == 0) {
                        document.getElementById("words").innerHTML = "You Lose!";
                        guessBtn.disabled = true;
                        resetBtn.classList.remove("hidden");
                    }
                    // if score reaches 5, display the winning msg
                    else if (json[0] == 5) {
                        document.getElementById("words").innerHTML = "You Win!";
                        guessBtn.disabled = true;
                        resetBtn.classList.remove("hidden");
                    }
                }
            })
    })
    resetBtn.addEventListener('click', () => {
        fetch(`https://ades-ca3-wordscramble.herokuapp.com/reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then((response) => { return response.json() })
            .then((json) => {
                console.log(json.word);
                word.innerHTML = json.word;
                // update the lives span
                score.innerHTML = json.score;
                // update the score span
                lives.innerHTML = json.lives;
            })
        resetBtn.classList.toggle("hidden");
        guessBtn.disabled = false;
    });

})