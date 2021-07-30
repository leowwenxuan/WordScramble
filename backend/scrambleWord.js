var words = ["python", "plate", "bowl", "fork", "spoon", "knife", "cupboard",
"mouse", "headphones", ""];

function getrandomWords() {
        // chose a random word from the original array
        var randomWordsIndex = Math.floor(Math.random() * words.length);
        // word.push(words[randomWordsIndex]);
        // store the word into a variable
        var chosenWord = words[randomWordsIndex];
        // remove the word from the original array to prevent repetition
        words.splice(randomWordsIndex, 1);
        // console.log(word)
        // console.log(chosenWord);
        return chosenWord;

};

module.exports = class ScrambleGame {
    constructor() {
        this.rndWord = getrandomWords();
        this.score = 0;
        this.lives = 5;
    }
    shuffle() {
        // store the word into a variable
        // var chosenWord = words[this.rndWord];
        // console.log(chosenWord);
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
        if (answer == this.rndWord) {
            this.score += 1;
            // console.log(getrandomWords())
            // var newWord = getrandomWords();
            this.rndWord = getrandomWords();
            // console.log(this.newWord);
            return this.rndWord;
            // return getrandomWords();
        }
        else if (answer !== this.rndWord) {
            this.lives -= 1;
            if (this.score !== 0) {
                this.score -= 1;
            }
        }
    }
};