const questions = {
    koty: [
        { question: "Ile palców u przednich łap ma zazwyczaj zdrowy kot?", answers: ["5", "6", "4", "8"], correct: 0 },
        { question: "Jak ma na imię moja kicia?", answers: ["Misia", "Florka", "Klusia", "Myszka"], correct: 2 },
        { question: "Które z tych warzyw jest bezpieczną przekąską dla kota?", answers: ["surowy ziemniak", "świeży ogórek", "czosnek", "awokado"], correct: 1 },
        { question: "W starożytnym Egipcie koty były tak czczone, że za ich skrzywdzenie groziła:", answers: ["kara więzienia", "publiczne przeprosiny", "grzywna", "kara śmierci"], correct: 3 },
        { question: "Co oznacza, gdy kot mruga do Ciebie powoli oboma oczami?", answers: ["Chce jeść", "Jest śpiący", "Koci pocałunek", "Chce być miziana"], correct: 2 },
        { question: "Który zmysł u kota jest najsłabiej rozwinięty w porównaniu do ludzi?", answers: ["słuch", "węch", "smak", "wzrok w ciemności"], correct: 2 }
    ],
    gry: [
        { question: "W której grze występuje miasto Los Santos?", answers: ["Cyberpunk 2077", "Watch Dogs", "GTA V", "SimCity"], correct: 2 },
        { question: "Która konsola jest najlepiej sprzedającą się konsolą stacjonarną w historii (155 mln sztuk)?", answers: ["Xbox 360", "PlayStation 2", "Wii", "Nintendo Switch"], correct: 1 },
        { question: "W grze Wiedźmin 3, jak nazywa się koń Geralta?", answers: ["Płotka", "Wicher", "Kasztan", "Rudy"], correct: 0 },
        { question: "W grze League of Legends, na której linii najczęściej grają postacie typu support?", answers: ["top", "mid", "jungle", "bot"], correct: 3 },
        { question: "Jaka gra logiczna posiada postać – sztuczną inteligencję o imieniu GLaDOS?", answers: ["Half-Life", "Portal", "BioShock", "Fallout"], correct: 1 },
        { question: "W którym roku zadebiutowała gra Counter-Strike: Global Offensive?", answers: ["2008", "2010", "2012", "2015"], correct: 2 }
    ],
    technologia: [
        { question: "Co oznacza skrót USB?", answers: ["Universal Serial Bus", "Ultra Speed Battery", "User System Base", "United Software Block"], correct: 0 },
        { question: "Jak nazywa się twórca portalu Facebook?", answers: ["Steve Jobs", "Bill Gates", "Mark Zuckerberg", "Elon Musk"], correct: 2 },
        { question: "Który format pliku służy głównie do zapisu obrazów z przezroczystością?", answers: ["JPG", "MP3", "PNG", "TXT"], correct: 2 },
        { question: "Jak potocznie nazywamy błąd w kodzie programu?", answers: ["Wirus", "Bug", "Lagg", "Spam"], correct: 1 },
        { question: "Która firma stworzyła system operacyjny Android?", answers: ["Apple", "Microsoft", "Google", "Samsung"], correct: 2 },
        { question: "Ile bitów składa się na jeden bajt (1 byte)?", answers: ["4", "8", "16", "32"], correct: 1 }
    ],
    jedzenie: [
        { question: "Jaki kraj jest ojczyzną ziemniaków?", answers: ["Polska", "Irlandia", "Peru", "Chiny"], correct: 2 },
        { question: "Jak nazywa się najostrzejsza część papryczki chilli?", answers: ["Skórka", "Ogonek", "Nasiona i białe błonki", "Czubek"], correct: 2 },
        { question: "Z jakiego kraju pochodzi oryginalna receptura na croissanty?", answers: ["Z Francji", "Z Włoch", "Z Austrii", "Z Belgii"], correct: 2 },
        { question: "Który z tych owoców nie rośnie na drzewie, tylko na krzaku blisko ziemi?", answers: ["Ananas", "Kokos", "Papaja", "Mango"], correct: 0 },
        { question: "Który produkt jako jedyny nigdy się nie psuje i może stać tysiące lat?", answers: ["Ryż", "Miód", "Sól morska", "Oliwa"], correct: 1 },
        { question: "Z czego tradycyjnie produkuje się ser Mozzarella?", answers: ["Z mleka krowiego", "Z mleka owczego", "Z mleka bawolego", "Z mleka koziego"], correct: 2 }
    ]
};

let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let canAnswer = true;

function startGame() {
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('category').classList.remove('hidden');
}

function showQuestion() {
    const currentQuestion = currentQuestions[currentQuestionIndex];
    document.getElementById('question').textContent = currentQuestion.question;
    document.getElementById('q-num').textContent = currentQuestionIndex + 1;
    const answersContainer = document.getElementById('answers');
    answersContainer.innerHTML = '';
    currentQuestion.answers.forEach((answerText, answerIndex) => {
        const answerButton = document.createElement('div');
        answerButton.className = 'answer';
        answerButton.textContent = answerText;
        answerButton.onclick = () => checkAnswer(answerIndex);
        answersContainer.appendChild(answerButton);
    });
    canAnswer = true;
}

function checkAnswer(selectedAnswerIndex) {
    if (!canAnswer) return;
    canAnswer = false;
    const currentQuestion = currentQuestions[currentQuestionIndex];
    const answerButtons = document.querySelectorAll('.answer');
    if (selectedAnswerIndex === currentQuestion.correct) {
        answerButtons[selectedAnswerIndex].classList.add('correct');
        score += 100;
    } else {
        answerButtons[selectedAnswerIndex].classList.add('wrong');
        answerButtons[currentQuestion.correct].classList.add('correct');
    }
    document.getElementById('points').textContent = score;
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < currentQuestions.length) {
            showQuestion();
        } else {
            endGame(currentQuestions.length);
        }
    }, 1500);
}

function endGame(totalQuestions) {
    document.getElementById('game-screen').classList.add('hidden');
    document.getElementById('end-screen').classList.remove('hidden');
    document.getElementById('final-score').textContent = score;

    const champion = document.getElementById('champion-title');
    let maxScore = totalQuestions * 100;
    let title = "";
    let color = "";

    if(score === maxScore){
        title = "Ultimate Meow Master";
        color = "gold";
    } else if(score >= 0.75 * maxScore){
        title = "Game Legend";
        color = "orange";
    } else if(score >= 0.5 * maxScore){
        title = "Game Master";
        color = "green";
    } else if(score >= 0.25 * maxScore){
        title = "Skilled Player";
        color = "blue";
    } else {
        title = "Rising Cat";
        color = "pink";
    }

    champion.textContent = title;
    champion.style.color = color;
    champion.classList.remove('hidden');
}


function selectCategory(category) {
    currentQuestions = questions[category];
    currentQuestionIndex = 0;
    score = 0;
    canAnswer = true;
    document.getElementById('category').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
    document.getElementById('points').textContent = score;
    document.getElementById('q-total').textContent = currentQuestions.length;
    showQuestion();
}

function createRandomPaw() {
    const paw = document.createElement('img');
    paw.src = 'lapki3.png';
    paw.classList.add('paw');

    const x = Math.random() * window.innerWidth;
    paw.style.left = `${x}px`;

    const size = 20 + Math.random() * 40;
    paw.style.width = `${size * 2}px`;
    paw.style.height = `${size * 2}px`;

    document.body.appendChild(paw);

    setTimeout(() => paw.remove(), 6000);
}
setInterval(createRandomPaw, 1500);


setInterval(createRandomPaw, 1500);
