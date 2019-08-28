'use strict'

const pList = (() => {
    const protoPlayer = (name, label) => {
        return { name, label };
    };

    const computerSelect = document.querySelector('#computer-select');
    computerSelect.addEventListener('click', () => {
        if (computerSelect.checked === true) {
            document.querySelector('#player-two-name').value = 'Computer';
            pTwo.name = 'Computer';
        }
        if (computerSelect.checked && !gameState.playerXHasTurn) {
            gameBoard.computerTurn();
        }
    });
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
    const computerSelect = document.querySelector('#computer-select');

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
                    if (gameState.playerXHasTurn) {
                        e.target.classList.add('active-x');
                    } else {
                        e.target.classList.add('active-o');
                    }
                    gameState.playerXHasTurn = !gameState.playerXHasTurn;
                }
                pList.updatePList();
                gameState.checkVictory();

                if (!gameState.playerXHasTurn && !gameState.matchComplete && computerSelect.checked) {
                    computerTurn();
                }
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

    const computerTurn = () => {
        let cellToClick;
        const delayClick = () => window.setTimeout(function () {
            cellToClick.click()
        }, 200);

        do {
            let randomCellId = Math.floor(Math.random() * 9);
            cellToClick = document.getElementById(`${randomCellId}`);
        } while (cellToClick.classList.contains('claimed'));
        
        delayClick();
    }

    return { gridCellArray, computerTurn };
})()

const gameState = (() => {
    let matchComplete = false;
    let playerXHasTurn = true;
    let title = document.querySelector('h1');

    const isBoardFull = () => {
        return gameBoard.gridCellArray.every(cell => cell.classList.contains('claimed'));
    };

    const clearGridListeners = () => {
        const gridContainer = document.querySelector('.grid-container');
        const gridClone = gridContainer.cloneNode(true);
        gridContainer.parentNode.replaceChild(gridClone, gridContainer);
    };

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

    const checkVictory = () => {
        for (let j = 1; j <= 3; j++) {
            checkRowOrColumn(pList.pOne.name, pList.pOne.label, j, 'row');
            checkRowOrColumn(pList.pOne.name, pList.pOne.label, j, 'column');
            checkRowOrColumn(pList.pTwo.name, pList.pTwo.label, j, 'row');
            checkRowOrColumn(pList.pTwo.name, pList.pTwo.label, j, 'column');
        }
        checkDiagonal(pList.pOne.name, pList.pOne.label);
        checkDiagonal(pList.pTwo.name, pList.pTwo.label);
        if (isBoardFull() && !gameState.matchComplete) {
            gameState.matchComplete = true;
            title.textContent = 'The game ended in a tie.';
        }
        if (gameState.matchComplete === true) {
            clearGridListeners();
        }
    }

    return { checkVictory, playerXHasTurn, matchComplete };
})();