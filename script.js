document.addEventListener('DOMContentLoaded', function () {
    const boxes = document.querySelectorAll('.box');
    const resetButton = document.getElementById('reset');
    const newGameButton = document.getElementById('newgame');
    const msgContainer = document.querySelector('.msg-container');
    const msgText = document.getElementById('msg');

    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameOver = false;

    function checkWinner() {
        const winningCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (const combo of winningCombos) {
            const [a, b, c] = combo;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return gameBoard[a];
            }
        }

        return null;
    }

    function checkDraw() {
        return !gameBoard.includes('');
    }

    function updateBoard(index) {
        if (!gameOver && gameBoard[index] === '') {
            gameBoard[index] = currentPlayer;
            boxes[index].textContent = currentPlayer;

            const winner = checkWinner();
            if (winner) {
                msgText.textContent = `Player ${winner} wins!`;
                msgContainer.classList.remove('hide');
                gameOver = true;
            } else if (checkDraw()) {
                msgText.textContent = "It's a draw!";
                msgContainer.classList.remove('hide');
                gameOver = true;
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    }

    function resetGame() {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        boxes.forEach(box => (box.textContent = ''));
        currentPlayer = 'X';
        gameOver = false;
        msgContainer.classList.add('hide');
    }

    boxes.forEach((box, index) => {
        box.addEventListener('click', function () {
            updateBoard(index);
        });
    });

    resetButton.addEventListener('click', resetGame);
    newGameButton.addEventListener('click', resetGame);
});
