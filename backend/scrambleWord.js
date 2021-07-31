var words = ["python", "plate", "bowl", "fork", "spoon", "knife", "cupboard",
"mouse", "headphones", "hike", "jabs", "junk", "jury","kept", "keys", "kilt",
"kiss", "lads", "lamp", "lean", "less", "mark", "pride", "print", "purse", "quack",
"queen", "quart", "query", "quiet", "rafts", "rated", "react","woefully", "xeroxing",
"yardwork", "yearbook", "yummiest", "zizzling", "zoologic", "zucchini", "zoneless",]

function getrandomWords() {
        // chose a random word from the original array
        var randomWordsIndex = Math.floor(Math.random() * words.length);
        // store the word into a variable
        var chosenWord = words[randomWordsIndex];
        // remove the word from the original array to prevent repetition
        words.splice(randomWordsIndex, 1);
        return chosenWord;

};

module.exports = class ScrambleGame {
    constructor() {
        this.rndWord = getrandomWords();
        this.score = 0;
        this.lives = 5;
    }
    shuffle() {
        // split the chosen word into letters and store them in a variable
        const letters = this.rndWord.split("");
        // store the chosen words' length
        let wordLen = letters.length;
        let tmp;
        // loop to shuffle the letters
        for (var i = wordLen; i > 0; i--) {
            var scrambled = Math.floor(Math.random() * wordLen);
            // And swap it with the current element.
            tmp = letters[wordLen];
            letters[wordLen] = letters[scrambled];
            letters[scrambled] = tmp;
        }
        // console.log(letters.join(""));
        return letters.join("");
    }
    progress(){
        return [this.score, this.lives, this.shuffle()];
    }
    guess(answer) {
        // check if the user guess correct, if correct add +1 score
        if (answer == this.rndWord) {
            this.score += 1;
            this.rndWord = getrandomWords();
            return this.rndWord;
        }
        // if user anwer is incorrect, -1 lives
        else if (answer !== this.rndWord) {
            this.lives -= 1;
            // if there's score -1 score
            if (this.score !== 0) {
                this.score -= 1;
            }
        }
    }
};