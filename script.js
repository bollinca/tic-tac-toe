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

    const addOnClick = (() => {
        gridCellArray.forEach(cell => cell.addEventListener('click', (e) => {
            if (!e.target.classList.contains('claimed')) {
                e.target.classList.add('claimed');
            }
        }));
    })();

    return { gridCellArray };
})()

const gameState = (() => {
    let matchComplete = false;

    const isBoardFull = (() => {
        //return (9 cells claimed)
    })()

    // const togglePlayerTurn = (() => {

    // })();

    // const isGameOver = () => {

    // };

    // const victoryConditions = (() => {
    //     const rowWin = [];
    //     const columnWin = [];
    //     const diagonalWin = [];
    // })();

    return { matchComplete, isBoardFull };
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