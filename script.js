document.addEventListener('DOMContentLoaded', function() {
    const size = prompt("Introduce el tamaño del cartón (3, 4 o 5):");
    
    if (size !== "3" && size !== "4" && size !== "5") {
      alert("Tamaño inválido. Por favor, elige 3, 4 o 5.");
      return;
    }
  
    for (let i = 0; i < 4; i++) {
      const numbers = generateRandomNumbers(1, 50, size * size);
      createBingoCard(size, numbers);
    }
  });
  
  function createBingoCard(size, numbers) {
    const bingoCard = document.createElement('div');
    bingoCard.classList.add('bingo-card');
  
    for (let i = 0; i < size; i++) {
      const row = document.createElement('div');
      row.classList.add('row');
  
      for (let j = 0; j < size; j++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.textContent = numbers[i * size + j];
        row.appendChild(cell);
      }
  
      bingoCard.appendChild(row);
    }
  
    document.body.appendChild(bingoCard);
  }
  
  function generateRandomNumbers(min, max, count) {
    const numbers = new Set();
  
    while (numbers.size < count) {
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      numbers.add(randomNumber);
    }
  
    return Array.from(numbers);
  }