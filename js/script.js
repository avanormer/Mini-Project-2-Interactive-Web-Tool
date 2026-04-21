// State variables
let flashcards = [];
let currentIndex = 0;
let isFlipped = false;

// DOM elements
const form = document.getElementById('flashcard-form');
const questionInput = document.getElementById('question');
const answerInput = document.getElementById('answer');
const flashcard = document.getElementById('flashcard');
const front = flashcard.querySelector('.front');
const back = flashcard.querySelector('.back');
const flipBtn = document.getElementById('flip');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('previous');
const memorizedBtn = document.getElementById('memorized');
const practiceBtn = document.getElementById('practice');
const resetBtn = document.getElementById('reset');

// Add message element for validation
const messageDiv = document.createElement('div');
messageDiv.id = 'message';
messageDiv.style.color = 'red';
messageDiv.style.marginTop = '10px';
form.appendChild(messageDiv);

// Function to add a new flashcard
function addFlashcard(question, answer) {
    flashcards.push({
        question: question,
        answer: answer,
        status: 'new'
    });

    // If this is the first card, display it
    if (flashcards.length === 1) {
        currentIndex = 0;
        displayCard();
    }

    // Clear any previous message
    messageDiv.textContent = '';
}

// Function to display the current flashcard
function displayCard() {
    if (flashcards.length === 0) {
        front.textContent = 'No flashcards yet. Add one!';
        back.textContent = '';
        return;
    }

    const card = flashcards[currentIndex];
    front.textContent = card.question;
    back.textContent = card.answer;

    // Reset flip state
    flashcard.classList.remove('flipped');
    isFlipped = false;
}

// Function to flip the flashcard
function flipCard() {
    if (flashcards.length === 0) return;

    flashcard.classList.toggle('flipped');
    isFlipped = !isFlipped;
}

// Function to go to the next card
function nextCard() {
    if (flashcards.length === 0) return;

    currentIndex = (currentIndex + 1) % flashcards.length;
    displayCard();
}

// Function to go to the previous card
function prevCard() {
    if (flashcards.length === 0) return;

    currentIndex = (currentIndex - 1 + flashcards.length) % flashcards.length;
    displayCard();
}

// Function to mark current card as memorized
function markMemorized() {
    if (flashcards.length === 0) return;

    flashcards[currentIndex].status = 'memorized';
    nextCard(); // Automatically move to next card
}

// Function to mark current card as needs practice
function markPractice() {
    if (flashcards.length === 0) return;

    flashcards[currentIndex].status = 'practice';
    nextCard(); // Automatically move to next card
}

// Function to reset all flashcards
function resetCards() {
    flashcards = [];
    currentIndex = 0;
    displayCard();
}

// Event listeners
form.addEventListener('submit', function(e) {
    e.preventDefault();

    const question = questionInput.value.trim();
    const answer = answerInput.value.trim();

    // Validate inputs
    if (!question || !answer) {
        messageDiv.textContent = 'Please enter both question and answer.';
        return;
    }

    addFlashcard(question, answer);

    // Clear form inputs
    questionInput.value = '';
    answerInput.value = '';
});

flipBtn.addEventListener('click', flipCard);
nextBtn.addEventListener('click', nextCard);
prevBtn.addEventListener('click', prevCard);
memorizedBtn.addEventListener('click', markMemorized);
practiceBtn.addEventListener('click', markPractice);
resetBtn.addEventListener('click', resetCards);

// Initial display
displayCard();