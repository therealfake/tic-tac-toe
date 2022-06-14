
/**
 * Player factory function
 * @param {*} name 
 * @returns 
 */
 const player = (name, piece) => {
    return { name, piece };
}

const gameBoard = (() => {
    let board = ['','','','','','','','',''];

    resetBtn = document.getElementById('reset-btn');
    cells = document.querySelectorAll('.cell')
    resetBtn.addEventListener('click', () => {
        for(let i = 0; i < board.length; i++) {
            cells[i].textContent = '';
            board[i] = '';
        }
    })
    return { board }
})();

const p1 = player('Elon', 'X')

const displayController = ((board, piece) => {
    

    for(let i = 0; i < board.length; i++) {
        cells[i].addEventListener('click', (e) => {
            if (board[i] == '') {
                e.target.textContent = piece;
                board[i] = piece;
            }
        })
        // add hovering such that lighter colored piece shows where user hovers
    }

    const drawGrid = () => {
        for(let i = 0; i < board.length; i++) {
            cells[i].textContent = board[i];
        }
    }

    return {
        drawGrid
    }
})(gameBoard.board, p1.piece);

// displayController.drawGrid()