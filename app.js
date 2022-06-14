const gameBoard = (() => {
    let board = ['X','X','X','X','X','X','X','X','X'];
    return { board }
})();

const displayController = (board => {
    cells = document.querySelectorAll('.cell')
    const drawGrid = () => {
        for(let i = 0; i < board.length; i++) {
            cells[i].textContent = board[i];
        }
    }

    return {
        drawGrid
    }
})(gameBoard.board);

/**
 * Player factory function
 * @param {*} name 
 * @returns 
 */
const player = (name) => {
    return { name };
}

displayController.drawGrid()