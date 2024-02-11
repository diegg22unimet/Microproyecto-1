// Lista que almacena los números que ya salieron en cada turno
var playedNumbers = [];
// Variable que cuenta de forma regresiva los turnos restantes
var remainingTurns = 25;


// Rellena los cartones de bingo con números del 1 al 50
function generateRandomNumbers() {
  var numbers = [];
  while (numbers.length < 25) {
    var randomNumber = Math.floor(Math.random() * 50) + 1;
    if (numbers.indexOf(randomNumber) === -1) {
      numbers.push(randomNumber);
    }
  }
  return numbers;
}

// Genera el contenedor en el que va cada cartón de bingo acompañado del nombre del jugador
function generateCard(size, playerName) {
  var card = document.createElement("div");
  card.classList.add("card");

  var numbers = generateRandomNumbers();

  var playerNameElement = document.createElement("h2");
  playerNameElement.textContent = playerName;
  card.appendChild(playerNameElement);

  for (var i = 0; i < size; i++) {
    var row = document.createElement("div");
    row.classList.add("numbers");
    for (var j = 0; j < size; j++) {
      var number = document.createElement("div");
      number.classList.add("number");
      number.textContent = numbers[i * size + j];
      row.appendChild(number);
    }
    card.appendChild(row);
  }

  return card;
}

// Genera los cartones de bingo del tamaño que seleccionó el usuario
function generateCards() {
  var sizeSelect = document.getElementById("size");
  var size = parseInt(sizeSelect.value);
  var container = document.getElementById("cards-container");
  var form = document.getElementById("bingo-form");

  container.innerHTML = "";

  for (var i = 1; i <= 4; i++) {
    var playerName = form["player" + i].value;
    var card = generateCard(size, playerName);
    container.appendChild(card);
  }
}

// Genera números aleatorios del 1 al 50
function generateRandomNumber() {
  var randomNumber;
  do {
    randomNumber = Math.floor(Math.random() * 50) + 1;
  } while (playedNumbers.includes(randomNumber));
  playedNumbers.push(randomNumber);
  return randomNumber;
}

// Actualiza el contador de turnos
function updateTurnsCounter() {
  var turnsCounter = document.getElementById("turns-counter");
  turnsCounter.textContent = remainingTurns;
}

// Botón "Jugar"
function play() {
  if (remainingTurns > 0) {
    var numberElement = document.querySelector(".actual-number");
    var number = generateRandomNumber();
    numberElement.textContent = number;
    remainingTurns--;
    updateTurnsCounter();

    var cards = document.getElementsByClassName("card");
    for (var i = 0; i < cards.length; i++) {
      var numbers = cards[i].getElementsByClassName("number");
      for (var j = 0; j < numbers.length; j++) {
        var cardNumber = parseInt(numbers[j].textContent);
        if (cardNumber === number) {
          numbers[j].classList.add("matched");
        }
      }
    }
  }
}

// Botón "Reiniciar juego"
function restartGame() {
  location.reload();
}

// Valida que los campos de los nombre de jugadores estén llenos antes de dar inicio al juego
function checkPlayerInputs() {
  var playerInputs = document.getElementsByClassName("player-input");
  var areInputsFilled = true;
  for (var i = 0; i < playerInputs.length; i++) {
    if (playerInputs[i].value === "") {
      areInputsFilled = false;
      break;
    }
  }
  if (!areInputsFilled) {
    alert("Por favor complete todos los nombres de los jugadores antes de iniciar el juego.");
    return false;
  }
  return true;
}

var startButton = document.getElementById("start-btn");
startButton.addEventListener("click", function() {
  if (checkPlayerInputs()) {
    gameContainer.classList.remove("hidden");
    cardsContainer.classList.remove("hidden");
    restartButton.classList.remove("hidden");
  }
});

var gameContainer = document.getElementById("game-container");
var cardsContainer = document.getElementById("cards-container")
var restartButton = document.getElementById("restart-button");

startButton.addEventListener("click", generateCards);

var playButton = document.getElementById("play-btn");
playButton.addEventListener("click", play);

var restartAction = document.getElementById("restart");
restartAction.addEventListener("click", restartGame);

updateTurnsCounter();