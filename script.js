'use strict'

const gameBoard = (() => {
    const cellList = [];

    const renderBoard = ((cellNumber) => {
        for (let i = 0; i < cellNumber; i++) {
            let gridContainer = document.querySelector('.grid-container');
            let gridCell = document.createElement('div');
            gridCell.classList.add('grid-cell');
            gridCell.setAttribute('id', `grid-cell-${i + 1}`)
            gridContainer.appendChild(gridCell);

            cellList.push(`grid-cell-${i + 1}`);
        }
    })(9);

    return { cellList };
})();

const protoPlayer = (team, playerClass) => {

    const cellsClaimed = [];
    const gridCells = document.querySelectorAll('.grid-cell');
    const status = 'off';

    const displayController = () => {
        gridCells.forEach(cell => cell.addEventListener('click', (e) => cellsClaimed.push(e.target.id)));
        gridCells.forEach(cell => cell.addEventListener('click', (e) => e.target.classList.add(playerClass)));
    };

    const playerToggle = () => {
        if (status === 'off') {
            status = 'on'
        } else if (status === 'on') {
            status = 'off';
        }
        return {status};
    };

    return { team, cellsClaimed };
}

// const players
// const playerEx

// const playerOh

// toggle between players on each click