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
    question:
      "De acordo com a LGPD, o que são considerados dados pessoais sensíveis?",
    options: [
      "Nome completo e data de nascimento",
      "Informações financeiras",
      "Dados sobre origem racial, saúde ou orientação sexual",
      "Preferências de compra",
    ],
    answer: "Dados sobre origem racial, saúde ou orientação sexual",
  },
  {
    question:
      "Segundo a LGPD, o consentimento do titular é dispensado para o tratamento de dados pessoais em qual das seguintes situações?",
    options: [
      "Pesquisa de satisfação comercial",
      "Cumprimento de obrigação legal ou regulatória",
      "Envio de promoções de marketing",
      "Execução de contratos de publicidade",
    ],
    answer: "Cumprimento de obrigação legal ou regulatória",
  },
  {
    question:
      "Qual é o prazo para que as empresas atendam às solicitações de titulares de dados, segundo a LGPD?",
    options: ["24 horas", "5 dias úteis", "15 dias úteis", "30 dias corridos"],
    answer: "15 dias úteis",
  },
  {
    question:
      "De acordo com a LGPD, o titular dos dados pessoais possui qual dos seguintes direitos?",
    options: [
      "Direito à remuneração pelo uso de seus dados pessoais",
      "Direito de saber quais dados pessoais estão sendo tratados",
      "Direito de apropriação dos dados coletados por terceiros",
      "Direito de venda de seus dados a empresas",
    ],
    answer: "Direito de saber quais dados pessoais estão sendo tratados",
  },
  {
    question: "Na LGPD, o que é considerado “Controlador” de dados pessoais?",
    options: [
      "Pessoa ou empresa que usa dados pessoais apenas para estatísticas",
      "Pessoa ou empresa que toma decisões sobre o tratamento de dados pessoais",
      "Software que armazena e organiza dados pessoais",
      "Profissional que realiza marketing digital",
    ],
    answer:
      "Pessoa ou empresa que toma decisões sobre o tratamento de dados pessoais",
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
  {
    question:
      "De acordo com a LGPD, em qual situação os dados pessoais podem ser compartilhados sem autorização?",
    options: [
      "Para execução de estudos acadêmicos, desde que anonimizado",
      "Para envio de e-mails de marketing",
      "Para finalidades comerciais",
      "Para divulgação em redes sociais",
    ],
    answer: "Para execução de estudos acadêmicos, desde que anonimizado",
  },
  {
    question:
      "Em caso de vazamento de dados, o controlador deve informar à ANPD em qual situação?",
    options: [
      "Apenas se houver uma ordem judicial",
      "Apenas se o vazamento for intencional",
      "Quando o incidente possa acarretar risco aos direitos dos titulares",
      "Somente se o titular dos dados reclamar"
    ],
    answer: "Quando o incidente possa acarretar risco aos direitos dos titulares",
  },
];

let currentQuestion = 0;
let selectedAnswer = "";
let score = 0; // Inicializa a pontuação

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
  updateScore(); // Atualiza a pontuação ao iniciar o jogo
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
  });
}

function submitAnswer() {
  const feedbackEl = document.getElementById("feedback");

  if (selectedAnswer === questions[currentQuestion].answer) {
    feedbackEl.style.color = "#00ff15";
    feedbackEl.innerText = "Correto! Você conseguiu mais uma chave!";
    score++; // Aumenta a pontuação em 10 para cada resposta correta
    updateScore(); // Atualiza a pontuação na tela
    correctSound.volume = 0.35;
    correctSound.play();
    currentQuestion++;

    if (currentQuestion < questions.length) {
      setTimeout(() => {
        loadQuestion();
      }, 1000);
    } else {
      showVictoryScreen(); // Mostra a tela de vitória
    }
  } else {
    feedbackEl.style.color = "#ff7b7b";
    feedbackEl.innerText = "Resposta incorreta! Tente novamente.";
    incorrectSound.volume = 0.35;
    incorrectSound.play();
  }
}

function updateScore() {
  document.getElementById("score").innerText = `🔑 ${score} chaves coletadas`; // Exibe a pontuação
}

function showVictoryScreen() {
  document.getElementById("game-container").style.display = "none";
  document.getElementById("victory-screen").style.display = "block";
  document.getElementById("final-score").innerText = score;
}

function restartGame() {
  score = 0;
  currentQuestion = 0;
  selectedAnswer = "";
  document.getElementById("victory-screen").style.display = "none";
  document.getElementById("intro-screen").style.display = "block";
}
