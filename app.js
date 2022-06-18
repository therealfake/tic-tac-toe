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

    const getAvailibleCells = () => {
        let availible = []
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                availible.push(i);
            }
        }
        return availible;
    }

    const boardIsFull = () => {
        return board.every(index => index !=='');
    }
    const resetBoard = () => {
        for(let i = 0; i < board.length; i++) {
            board[i] = '';
        }
    }

    return { setCell, getCell, getAvailibleCells, boardIsFull, resetBoard };
})();

// factory function for displaying the game
const displayController = (() => {
    let currMode = document.getElementById('mode');
    let cells = document.querySelectorAll('.cell');
    let resetBtn = document.getElementById('reset-btn');

    currMode.addEventListener("change", () => {
        resetBtn.click();
        gameController.setMode(currMode.value);
    })

    for(let i = 0; i < cells.length; i++) {
        cells[i].addEventListener("click", (e) => {
            if (e.target.textContent !== "" || gameController.getGameFinished()) return;
            gameController.playRound(i);
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

    function displayResult(result) {
        resultMsg = document.getElementById('result-msg');
        if (result === 'Tie') {
            resultMsg.textContent = ("Tie!");
        } else {
            resultMsg.textContent = (`${result} Wins!`);
        }
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
    let round = 1;
    let mode = 'one-player';
    let gameFinished = false;

    const setMode = (selectedMode) => { mode = selectedMode };
    const getMode = () => { return mode };
    const getGameFinished = () =>{ return gameFinished };

    function playRound(cellIndex){
        if (round % 2 == 0 && mode !== 'two-player') return;

        round++;
        gameBoard.setCell(cellIndex, getCurrentPlayerPiece());
        displayController.updateGameBoard();
        let gameResult = checkGame();
        if (gameResult) {
            gameFinished = true;
            displayController.displayResult(gameResult);
        } else if (mode !=='two-player') {
            setTimeout(() => { computerRound() }, 500);
        }

    };

    function computerRound() {
        round++;
        let availibleCells = gameBoard.getAvailibleCells();
        let computer = mode === 'one-player' ? simpleComputerMove(availibleCells): aiComputerMove(availibleCells);
        gameBoard.setCell(computer, getCurrentPlayerPiece());
        displayController.updateGameBoard();
        let gameResult = checkGame();
        if (gameResult) {
            gameFinished = true;
            displayController.displayResult(gameResult);
        };
    }

    function getCurrentPlayerPiece() {
        return players[round % 2].piece
    };

    function simpleComputerMove(availibleCells) {
        let pick = Math.floor((Math.random() * availibleCells.length) + 1) - 1;
        return availibleCells[pick];
    }

    function aiComputerMove(availibleCells) {
        let bestScore = -Infinity;
        let bestMove;
        for (let i = 0; i < availibleCells.length; i++) {
            gameBoard.setCell(availibleCells[i], 'O');
            let score = minimax(false);
            gameBoard.setCell(availibleCells[i], '');
            if (score > bestScore) {
                bestScore = score;
                bestMove = availibleCells[i];
            }
        }
        return bestMove;
    }

    let scores = {'O': 1, 'X': -1, 'Tie': 0};

    function minimax(isMaximizing) {
        let result = checkGame();

        if (result != null) {
            return scores[result];
        }

        if (isMaximizing) { // computer is maximizing player
            let availibleCells = gameBoard.getAvailibleCells();
            let bestScore = -Infinity;
            for (let i = 0; i < availibleCells.length; i++) {
                gameBoard.setCell(availibleCells[i], 'O');
                let score = minimax(false);
                gameBoard.setCell(availibleCells[i], '');
                bestScore = Math.max(bestScore, score);
            }
            return bestScore;
        } else { // human i the minimizing player
            let availibleCells = gameBoard.getAvailibleCells();
            let bestScore = Infinity;
            for (let i = 0; i < availibleCells.length; i++) {
                gameBoard.setCell(availibleCells[i], 'X');
                let score = minimax(true);
                gameBoard.setCell(availibleCells[i], '');
                bestScore = Math.min(bestScore, score);
            }
            return bestScore;
        }
    }

    function checkGame() {
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
        
        xWin = winningPaths
        .some(path => path.every(index => gameBoard.getCell(index) == 'X'));
        oWin = winningPaths
        .some(path => path.every(index => gameBoard.getCell(index) == 'O'));
        
        if (xWin) {
            return 'X';
        } else if(oWin){
            return 'O';
        } else if (gameBoard.boardIsFull()) {
            return 'Tie';
        } else {
            return null;
        }
    };

    
    function resetGame() {
        round = 1;
        gameFinished = false;
    }
    
    return {
        setMode, getMode,
        getGameFinished, playRound, 
        resetGame
    };
    
})();

