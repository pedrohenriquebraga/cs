let currentStage = 0;

const stages = [
    {
        question: "Qual é a senha para abrir a porta?",
        answer: "1234",
        hint: "É uma sequência de números."
    },
    {
        question: "Qual é o código para desativar a armadilha?",
        answer: "abcd",
        hint: "São letras sequenciais."
    }
];

function checkAnswer() {
    const userAnswer = document.getElementById('answer').value;
    const messageElement = document.getElementById('message');

    // Limpa o campo de resposta após verificar a resposta
    document.getElementById('answer').value = '';

    if (userAnswer.toLowerCase() === stages[currentStage].answer) {
        currentStage++;
        messageElement.className = 'correct'; // Adiciona classe para resposta correta
        if (currentStage < stages.length) {
            messageElement.textContent = "Correto! Avance para a próxima etapa.";
            document.getElementById('description').textContent = stages[currentStage].question;
        } else {
            messageElement.textContent = "Parabéns! Você escapou da sala!";
            document.getElementById('description').textContent = "Você venceu!";
            document.getElementById('answer').style.display = 'none';
            document.querySelector('button').style.display = 'none';
        }
    } else {
        messageElement.className = 'incorrect'; // Adiciona classe para resposta incorreta
        messageElement.textContent = "Resposta incorreta. Tente novamente!";
    }
}

// Adiciona um evento de escuta para o campo de entrada
document.getElementById('answer').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        checkAnswer ();
    }
});

// Inicia o jogo com a primeira pergunta
document.getElementById('description').textContent = stages[currentStage].question;
