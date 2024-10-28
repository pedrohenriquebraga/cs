const questions = [
  {
    question: "Qual é o objetivo principal da LGPD?",
    options: [
      "Proteger dados pessoais",
      "Permitir acesso irrestrito a dados",
      "Controlar uso de redes sociais",
      "Regular o comércio eletrônico",
    ],
    answer: "Proteger dados pessoais",
  },
  {
    question: "Qual órgão é responsável pela fiscalização da LGPD no Brasil?",
    options: ["ANPD", "IBGE", "Ministério da Justiça", "SERPRO"],
    answer: "ANPD",
  },
  {
    question:
      "Qual a idade mínima para consentimento de dados pessoais na LGPD?",
    options: ["16", "18", "13", "21"],
    answer: "18",
  },
];

let currentQuestion = 0;
let selectedAnswer = "";

// Música do jogo
const sound = document.querySelector("#sound");
const correctSound = document.querySelector("#correct-sound");
const incorrectSound = document.querySelector("#incorrect-sound");

sound.volume = 0.25;
document.addEventListener("click", () => sound.play());

// Animação luz piscando
window.addEventListener("load", () => {
  setInterval(() => {
    document.querySelector("body").classList.toggle("animate");
  }, 6000);
});

function startGame() {
  document.getElementById("intro-screen").style.display = "none";
  document.getElementById("game-container").style.display = "block";
  loadQuestion();
}

function loadQuestion() {
  const questionEl = document.getElementById("question");
  const optionsEl = document.getElementById("options");
  const feedbackEl = document.getElementById("feedback");

  questionEl.innerText = questions[currentQuestion].question;
  optionsEl.innerHTML = ""; // Limpa as opções anteriores
  feedbackEl.innerText = ""; // Limpa o feedback anterior

  questions[currentQuestion].options.forEach((option) => {
    const button = document.createElement("button");
    button.classList.add("option-button");
    button.innerText = option;
    button.onclick = () => selectAnswer(option);
    optionsEl.appendChild(button);
  });
}

function selectAnswer(option) {
  selectedAnswer = option;
  const buttons = document.querySelectorAll(".option-button");
  buttons.forEach((button) => {
    button.style.backgroundColor =
      button.innerText === option ? "#000000" : "transparent";
    // button.style.color = button.innerText === option ? "#fff" : "#fff"
  });
}

function submitAnswer() {
  const feedbackEl = document.getElementById("feedback");

  if (selectedAnswer === questions[currentQuestion].answer) {
    feedbackEl.innerText = "Correto! Avançando para a próxima fase.";
    correctSound.volume = 0.35;
    correctSound.play();
    currentQuestion++;

    if (currentQuestion < questions.length) {
      setTimeout(() => {
        loadQuestion();
      }, 1000);
    } else {
      feedbackEl.innerText = "Parabéns! Você completou o Escape Room da LGPD.";
    }
  } else {
    feedbackEl.innerText = "Resposta incorreta! Tente novamente.";
    incorrectSound.volume = 0.35;
    incorrectSound.play();
  }
}
