'use strict'

const protoPlayer = (name, teamClass) => {
    return { name, teamClass };
};

const playerList = (() => {
    const playerOne = protoPlayer('X', 'teamX');
    const playerTwo = protoPlayer('O', 'teamO');

    return { playerOne, playerTwo };
})();

const gameBoard = (() => {
    const gridCellArray = [];

    const createBoard = ((totalCells) => {
        for (let i = 1; i <= totalCells; i++) {

            const gridCell = document.createElement('div');
            gridCell.classList.add('grid-cell');
            gridCell.setAttribute('id', `${i}`);

            const gridContainer = document.querySelector('.grid-container');
            gridContainer.appendChild(gridCell);

            gridCellArray.push(gridCell);
        }
    })(9)

    const addListeners = (() => {
        gridCellArray.forEach(cell => cell.addEventListener('click', (e) => {
            if (!e.target.classList.contains('claimed')) {
                console.log(gameState.playerXHasTurn);
                e.target.classList.add('claimed');
                if (gameState.playerXHasTurn === true) {
                    e.target.classList.add('active-x');
                } else {
                    e.target.classList.add('active-o');
                }
                gameState.playerXHasTurn = !gameState.playerXHasTurn;

                // if (gameState.playerTurn === 'X') {
                // e.target.classList.add('active-x');
                // }
            }
        }));
    })();

    return { gridCellArray };
})()

const gameState = (() => {
    let matchComplete = false;
    let playerXHasTurn = true;
    
    const isBoardFull = (() => {
        //return (9 cells claimed)
    })()
    
    // const isGameOver = () => {

    // };

    // const victoryConditions = (() => {
    //     const rowWin = [];
    //     const columnWin = [];
    //     const diagonalWin = [];
    // })();

    return { matchComplete, isBoardFull, playerXHasTurn };
})();


/*
refactoring notes:

player should have:
 - name
 - team-assignment

gameBoard should have:
 - cell array
 - display changes

gameState should have:
 - player turn (previously 'status')
 - victory checks

*/