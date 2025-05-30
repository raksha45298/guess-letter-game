// List of words for the game
const words = [
    'JAVASCRIPT',
    'PYTHON',
    'PROGRAMMING',
    'COMPUTER',
    'DEVELOPER',
    'INTERNET',
    'KEYBOARD',
    'MONITOR',
    'SOFTWARE',
    'HARDWARE'
];

// Game state
let selectedWord = '';
let guessedLetters = new Set();
let remainingGuesses = 6;
let gameOver = false;

// DOM elements
const wordDisplay = document.querySelector('.word-display');
const keyboard = document.querySelector('.keyboard');
const message = document.querySelector('.message');
const newGameBtn = document.querySelector('.new-game-btn');

// Initialize the game
function initGame() {
    // Reset game state
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters.clear();
    remainingGuesses = 6;
    gameOver = false;
    message.textContent = '';

    // Reset hangman drawing
    document.querySelectorAll('.hangman-head, .hangman-body, .hangman-left-arm, .hangman-right-arm, .hangman-left-leg, .hangman-right-leg')
        .forEach(part => part.style.display = 'none');

    // Create keyboard
    keyboard.innerHTML = '';
    for (let i = 65; i <= 90; i++) {
        const letter = String.fromCharCode(i);
        const key = document.createElement('button');
        key.className = 'key';
        key.textContent = letter;
        key.addEventListener('click', () => handleGuess(letter));
        keyboard.appendChild(key);
    }

    // Update word display
    updateWordDisplay();
}

// Update the word display with guessed letters
function updateWordDisplay() {
    const display = selectedWord
        .split('')
        .map(letter => guessedLetters.has(letter) ? letter : '_')
        .join(' ');
    wordDisplay.textContent = display;

    // Check if player won
    if (!display.includes('_')) {
        gameOver = true;
        message.textContent = 'Congratulations! You won!';
        message.style.color = '#4CAF50';
    }
}

// Handle letter guess
function handleGuess(letter) {
    if (gameOver || guessedLetters.has(letter)) return;

    guessedLetters.add(letter);
    const key = Array.from(keyboard.children).find(k => k.textContent === letter);
    key.classList.add('used');

    if (selectedWord.includes(letter)) {
        updateWordDisplay();
    } else {
        remainingGuesses--;
        updateHangman();
    }

    // Check if player lost
    if (remainingGuesses === 0) {
        gameOver = true;
        message.textContent = `Game Over! The word was ${selectedWord}`;
        message.style.color = '#f44336';
    }
}

// Update hangman drawing based on remaining guesses
function updateHangman() {
    const parts = [
        'hangman-head',
        'hangman-body',
        'hangman-left-arm',
        'hangman-right-arm',
        'hangman-left-leg',
        'hangman-right-leg'
    ];
    
    const index = 6 - remainingGuesses;
    if (index >= 0 && index < parts.length) {
        document.querySelector(`.${parts[index]}`).style.display = 'block';
    }
}

// Event listeners
newGameBtn.addEventListener('click', initGame);

// Start the game
initGame(); 