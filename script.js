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

var startButton = document.getElementById("start-btn");
startButton.addEventListener("click", generateCards);