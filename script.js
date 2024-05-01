const board = document.getElementById('board');
    const message = document.querySelector('.message');
    const scoreXElement = document.getElementById('scoreX');
    const scoreOElement = document.getElementById('scoreO');
    const resetButton = document.querySelector('.reset-button');

    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
    let scoreX = 0;
    let scoreO = 0;

    function checkWinner() {
      const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
      ];

      for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
          return gameBoard[a];
        }
      }

      if (!gameBoard.includes('')) {
        return 'draw';
      }

      return null;
    }

    function handleClick(index) {
      if (!gameActive || gameBoard[index] !== '') {
        return;
      }

      gameBoard[index] = currentPlayer;
      renderBoard();

      const winner = checkWinner();
      if (winner) {
        if (winner === 'draw') {
          message.textContent = 'It\'s a draw!';
        } else {
          message.textContent = `Player ${winner} wins!`;
          updateScore(winner);
        }
        gameActive = false;
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      }
    }

    function resetGame() {
      gameBoard = ['', '', '', '', '', '', '', '', ''];
      renderBoard();
      message.textContent = '';
      gameActive = true;
      currentPlayer = 'X';
    }

    function renderBoard() {
      board.innerHTML = '';
      gameBoard.forEach((value, index) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.textContent = value;
        cell.addEventListener('click', () => handleClick(index));
        board.appendChild(cell);
      });
    }

    function updateScore(winner) {
      if (winner === 'X') {
        scoreX++;
        scoreXElement.textContent = scoreX;
      } else {
        scoreO++;
        scoreOElement.textContent = scoreO;
      }
    }

    resetButton.addEventListener('click', resetGame);

    renderBoard();