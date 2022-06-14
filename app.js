let currPlayer;

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
 * gameBoard module pattern object
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

    return { board, setPlayer }
})();

// Controller for displaying Game
const displayController = (() => {
    cells = document.querySelectorAll('.cell')

    return {
    }
})();


const gameController(() => {

})();