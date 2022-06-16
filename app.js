/**
 * Player factory function
 * @param {String} piece either 'X' or 'O'
 * @returns 
 */
const player = (piece) => {
    return {piece};
}

/**
 * gameBoard module 
 */
const gameBoard = (() => {
    let board = ['','','','','','','','',''];
    
    const setCell = (index, piece) => {
        board[index] = piece;
    }

    const getCell = (index) => {
        return board[index];
    }

    const resetBoard = () => {
        for(let i = 0; i < board.length; i++) {
            board[i] = '';
        }
    }

    return { board, setCell, getCell, resetBoard };
})();

// factory function for displaying the game
const displayController = (() => {
    cells = document.querySelectorAll('.cell');
    resetBtn = document.getElementById('reset-btn');

    for(let i = 0; i < cells.length; i++) {
        cells[i].addEventListener("click", (e) => {
            if (e.target.textContent !== "" || gameController.getGameFinished()) return;
            gameController.playRound(i);
            updateGameBoard();
        })
    }
    
    resetBtn.addEventListener("click", () => {
        gameBoard.resetBoard();
        resetDisplay();
        gameController.resetGame();
    });

    function updateGameBoard() {
        for(let i = 0; i < cells.length; i++) {
            cells[i].textContent = gameBoard.getCell(i);
        }
    }

    function displayResult(msg) {
        resultMsg = document.getElementById('result-msg');
        resultMsg.textContent = msg;
    }

    function resetDisplay() {
        resultMsg = document.getElementById('result-msg');
        resultMsg.textContent = '';
        updateGameBoard();
    }
    return { updateGameBoard, displayResult }
})();

// factory function for playing the actual game
const gameController = (() => {
    let p1 = player('X');
    let p2 = player('O');
    let players = [p1, p2];
    let round = 0;
    let gameFinished = false;

    const setPlayer1 = (player) => { p1 = player };
    const setPlayer2 = (player) => { p2 = player };
    const getPlayer1 = () => { return p1 };
    const getPlayer2 = () => { return p2 };

    function playRound(cellIndex){
        round++;
        console.log(round);
        gameBoard.setCell(cellIndex, getCurrentPlayerPiece());
        displayController.updateGameBoard();
        if (checkGame(cellIndex)) {
            gameFinished = true;
            displayController.displayResult("You Win!")
        } else if (round == 9) {
            gameFinished = true;
            displayController.displayResult("Tie!")
        }
    };

    function getCurrentPlayerPiece() {
        return players[round % 2].piece
    };

    function checkGame(cellIndex) {
        const winningPaths = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [1, 4, 7],
            [0, 3, 6],
            [2, 5, 8],
            [0, 4, 8],
            [6, 4, 2]
        ];
        
        return winningPaths
        .filter(path => path.includes(cellIndex))
        .some(path => path.every(index => gameBoard.getCell(index) == getCurrentPlayerPiece()));
    };

    function getGameFinished() {
        return gameFinished;
    }
    function resetGame() {
        round = 0;
        gameFinished = false;
    }
    
    return {
        setPlayer1, getPlayer1,
        setPlayer2, getPlayer2,
        playRound, gameFinished, round, getCurrentPlayerPiece, getGameFinished, resetGame
    };
    
})();