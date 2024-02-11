var playedNumbers = [];   // Lista para almacenar los números ya jugados en cada turno
var remainingTurns = 25; // Número de turnos restantes

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

function generateRandomNumber() {
  var randomNumber;
  do {
    randomNumber = Math.floor(Math.random() * 50) + 1;
  } while (playedNumbers.includes(randomNumber)); // Verificar si el número ya ha sido jugado
  playedNumbers.push(randomNumber); // Agregar el número a la lista de números jugados
  return randomNumber;
}

function updateTurnsCounter() {
  var turnsCounter = document.getElementById("turns-counter");
  turnsCounter.textContent = remainingTurns;
}

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

function restartGame() {
  location.reload();
}

var startButton = document.getElementById("start-btn");
var gameContainer = document.getElementById("game-container");
var restartButton = document.getElementById("restart-button")
startButton.addEventListener("click", function() {
    gameContainer.classList.remove("hidden");
    restartButton.classList.remove("hidden")
});
startButton.addEventListener("click", generateCards);

var playButton = document.getElementById("play-btn");
playButton.addEventListener("click", play);

var restartAction = document.getElementById("restart");
restartAction.addEventListener("click", restartGame);

updateTurnsCounter();