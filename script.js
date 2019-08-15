'use strict'

const gameBoard = (() => {
    const cellList = [];

    const test = 'this is a test';

    const renderBoard = ((cellNumber) => {
        for (let i = 0; i < cellNumber; i++) {
            let gridContainer = document.querySelector('.grid-container');
            let gridCell = document.createElement('div');
            gridCell.classList.add('grid-cell');
            gridCell.setAttribute('id', `grid-cell-${i + 1}`)
            cellList.push(`grid-cell-${i + 1}`);
            gridContainer.appendChild(gridCell);
            //add 'click' listeners
        }
    })(9);

    return {cellList};

// const players

})();

// const playerEx

// const playerOh

// toggle between players on each click