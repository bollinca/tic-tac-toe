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

const protoPlayer = (team, playerClass, status = 'off') => {
    
    const cellsClaimed = [];
    const gridCells = document.querySelectorAll('.grid-cell');

    const playerToggle = () => {
        if (status === 'off') {
            return status = 'on';
        } else if (status === 'on') {
            return status = 'off';
        }
    };

    const displayController = (() => {
        gridCells.forEach(cell => cell.addEventListener('click', (e) => {
            if (status === 'on' && !(e.target.classList.contains('claimed'))) {
                e.target.classList.add(playerClass)
                e.target.classList.add('claimed');
                cellsClaimed.push(e.target.id);
            }
        }));
    })();

    gridCells.forEach(cell => cell.addEventListener('click', () => {
        playerToggle();
    }
    ));

    return { team, cellsClaimed };
}