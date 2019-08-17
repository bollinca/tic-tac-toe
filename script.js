'use strict'

const protoPlayer = (name, team) => {
    return { name, team };
};

const gameBoard = (() => {
    const gridCellArray = [];

    const createBoard = ((totalCells) => {
        for (let i = 1; i <= totalCells; i++) {

            const gridCell = document.createElement('div');
            gridCell.classList.add('grid-cell');
            gridCell.setAttribute('id', `${i}`);

            const gridContainer = document.querySelector('.grid-container');
            gridContainer.appendChild(gridCell);

            gridCellArray.push(gridCell.attributes.id);
        }
    })(9)

    return { gridCellArray };
})()

const gameState = (() => {
    let matchComplete = false;

    const isBoardFull = (() => {
        //return (9 cells claimed)
    })()

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