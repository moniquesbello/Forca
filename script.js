
const words = [
    { word: "rewrite", hint: "Prefixo: re-" },
    { word: "unhappy", hint: "Prefixo: un-" },
    { word: "careless", hint: "Sufixo: -less" },
    { word: "kindness", hint: "Sufixo: -ness" },
    { word: "preview", hint: "Prefixo: pre-" },
    { word: "hopeful", hint: "Sufixo: -ful" }
];

let selectedWord = {};
let guessedLetters = [];
let attemptsLeft = 6;

function startGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    attemptsLeft = 6;

    document.getElementById("hint").innerText = "Dica: " + selectedWord.hint;
    document.getElementById("message").innerText = "";
    document.getElementById("attempts").innerText = attemptsLeft;
    createWordDisplay();
    createKeyboard();
}

function createWordDisplay() {
    const display = selectedWord.word.split("").map(letter =>
        guessedLetters.includes(letter) ? letter : "_"
    ).join(" ");
    document.getElementById("word").innerText = display;
}

function createKeyboard() {
    const keyboard = document.getElementById("keyboard");
    keyboard.innerHTML = "";
    for (let i = 65; i <= 90; i++) {
        const letter = String.fromCharCode(i).toLowerCase();
        const button = document.createElement("button");
        button.innerText = letter;
        button.disabled = guessedLetters.includes(letter);
        button.onclick = () => handleGuess(letter);
        keyboard.appendChild(button);
    }
}

function handleGuess(letter) {
    guessedLetters.push(letter);
    if (!selectedWord.word.includes(letter)) {
        attemptsLeft--;
        document.getElementById("attempts").innerText = attemptsLeft;
    }

    createWordDisplay();
    createKeyboard();
    checkGameStatus();
}

function checkGameStatus() {
    const wordGuessed = selectedWord.word.split("").every(letter => guessedLetters.includes(letter));
    if (wordGuessed) {
        document.getElementById("message").innerText = "🎉 Você venceu!";
        disableKeyboard();
    } else if (attemptsLeft <= 0) {
        document.getElementById("message").innerText = "❌ Você perdeu! A palavra era: " + selectedWord.word;
        disableKeyboard();
    }
}

function disableKeyboard() {
    const buttons = document.querySelectorAll("#keyboard button");
    buttons.forEach(btn => btn.disabled = true);
}

window.onload = startGame;
