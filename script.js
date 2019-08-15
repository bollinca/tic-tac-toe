const gameBoard = (() => {
    const renderBoard = ((cellNumber) => {
        for (let i = 0; i < cellNumber; i++) {
            let gridContainer = document.querySelector('.grid-container');
            let gridCell = document.createElement('div');
            gridCell.classList.add('grid-cell');
            gridContainer.appendChild(gridCell);
        }
    })(9);
    
})();

// const playerEx

// const playerOh

// toggle between players on each click