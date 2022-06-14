/**
 * Player factory function
 * @param {String} name player's name
 * @param {String} piece either 'X' or 'O'
 * @returns 
 */
const player = (name, piece) => {
    return { name, piece };
}

/**
 * gameBoard module 
 */
const gameBoard = (() => {
    let board = ['','','','','','','','',''];
    
    const setCell = (index, sign) => {
        board[index] = sign;
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

    cells.forEach(cell => {
        cell.addEventListener("click", (e) => {
            if (e.target.textContent !== "") return;
            updateGameBoard()
        })
    });
    
    resetBtn.addEventListener("click", (e) => {
        gameBoard.resetBoard();
    });

    function updateGameBoard() {
        for(let i = 0; i < cells.length; i++) {
            cells[i].textContent = gameBoard.board[i];
        }
    }

    return {
        updateGameBoard
    }
})();

displayController.updateGameBoard();
// factory function for displaying the game
// const gameController(() => {

// })();