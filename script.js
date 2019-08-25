'use strict'


const pList = (() => {
    const protoPlayer = (name, label) => {
        return { name, label };
    };


    const pOne = protoPlayer('Player One', 'x');
    const pTwo = protoPlayer('Player Two', 'o');

    const updatePList = () => {
        pOne.name = document.querySelector('#player-one-name').value;
        pTwo.name = document.querySelector('#player-two-name').value;
    }

    return { pOne, pTwo, updatePList };
})();

const gameBoard = (() => {
    const gridCellArray = [];

    const createBoard = (() => {
        const formGrid = ((totalCells) => {
            for (let i = 0; i < totalCells; i++) {

                const gridCell = document.createElement('div');
                gridCell.classList.add('grid-cell');
                gridCell.setAttribute('id', `${i}`);
                setXYClasses(gridCell, i);

                const gridContainer = document.querySelector('.grid-container');
                gridContainer.appendChild(gridCell);

                gridCellArray.push(gridCell);
            }
        })(9);

        const addListeners = (() => {
            const clearButton = document.querySelector('button');
            clearButton.addEventListener('click', () => location.reload());

            gridCellArray.forEach(cell => cell.addEventListener('click', (e) => {
                if (!e.target.classList.contains('claimed')) {
                    e.target.classList.add('claimed');
                    if (gameState.playerXHasTurn === true) {
                        e.target.classList.add('active-x');
                    } else {
                        e.target.classList.add('active-o');
                    }
                    gameState.playerXHasTurn = !gameState.playerXHasTurn;
                }
                pList.updatePList();
                gameState.checkVictory();
            }));
        })();

        function setXYClasses(cell, i) {
            if (i >= 6) {
                cell.classList.add('row-1');
            } else if (i >= 3) {
                cell.classList.add('row-2');
            } else if (i >= 0) {
                cell.classList.add('row-3');
            }

            if (i % 3 === 0) {
                cell.classList.add('column-1');
            } else if (i % 3 === 1) {
                cell.classList.add('column-2');
            } else if (i % 3 === 2) {
                cell.classList.add('column-3');
            }
        }

    })();

    return { gridCellArray };
})()

const gameState = (() => {
    let matchComplete = false;
    let playerXHasTurn = true;

    const isBoardFull = () => {
        return gameBoard.gridCellArray.every(cell => cell.classList.contains('claimed'));
    };

    const clearGridListeners = () => {
        const gridContainer = document.querySelector('.grid-container');
        const gridClone = gridContainer.cloneNode(true);
        gridContainer.parentNode.replaceChild(gridClone, gridContainer);
    };

    const checkVictory = () => {
        let title = document.querySelector('h1');

        const checkRowOrColumn = (name, label, index, rowOrColumn) => {
            let tempArray = [];
            for (let i = 0; i < gameBoard.gridCellArray.length; i++) {
                if (gameBoard.gridCellArray[i].classList.contains(`${rowOrColumn}-${index}`)
                    && gameBoard.gridCellArray[i].classList.contains(`active-${label}`)) {
                    tempArray.push(gameBoard.gridCellArray[i]);
                }
                if (tempArray.length === 3) {
                    title.textContent = `The winner is: ${name}`;
                    gameState.matchComplete = true;
                }
            }
        }

        const checkDiagonal = (name, label) => {
            let leftDiag = [];
            const ROW_LENGTH = 3;

            for (let i = 0; i < gameBoard.gridCellArray.length; i += (ROW_LENGTH + 1)) {
                if (gameBoard.gridCellArray[i].id === `${i}`
                    && gameBoard.gridCellArray[i].classList.contains(`active-${label}`)) {
                    leftDiag.push(gameBoard.gridCellArray[i]);
                }
                if (leftDiag.length === 3) {
                    title.textContent = `The winner is: ${name}`;
                    gameState.matchComplete = true;
                }
            }

            let rightDiag = [];
            const TOP_RIGHT_CELL = 2;
            const BOTTOM_LEFT_CELL = 6;
            for (let i = TOP_RIGHT_CELL; i <= BOTTOM_LEFT_CELL; i += (ROW_LENGTH - 1)) {
                if (gameBoard.gridCellArray[i].id === `${i}`
                    && gameBoard.gridCellArray[i].classList.contains(`active-${label}`)) {
                    rightDiag.push(gameBoard.gridCellArray[i]);
                    if (rightDiag.length === 3) {
                        title.textContent = `The winner is: ${name}`;
                        gameState.matchComplete = true;
                    }
                }
            }
        }

        for (let j = 1; j <= 3; j++) {
            checkRowOrColumn(pList.pOne.name, pList.pOne.label, j, 'row');
            checkRowOrColumn(pList.pOne.name, pList.pOne.label, j, 'column');
            checkRowOrColumn(pList.pTwo.name, pList.pTwo.label, j, 'row');
            checkRowOrColumn(pList.pTwo.name, pList.pTwo.label, j, 'column');
        }
        checkDiagonal(pList.pOne.name, pList.pOne.label);
        checkDiagonal(pList.pTwo.name, pList.pTwo.label);
        if (gameState.matchComplete === true) {
            clearGridListeners();
        } else if (isBoardFull() === true && matchComplete === false) {
            title.textContent = 'The game ended in a tie.';
        }
    }

    return { checkVictory, playerXHasTurn };
})();