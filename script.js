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

    const createBoard = (() => {
        const formGrid = ((totalCells) => {
            for (let i = 1; i <= totalCells; i++) {

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
                }
            }));
        })();

        function setXYClasses(cell, i) {
            if (i >= 6) {
                cell.classList.add('row-1');
            } else if (i >= 3) {
                cell.classList.add('row-2');
            } else if (i >= 1) {
                cell.classList.add('row-3');
            }

            if (i % 3 === 1) {
                cell.classList.add('column-1');
            } else if (i % 3 === 2) {
                cell.classList.add('column-2');
            } else if (i % 3 === 0) {
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

    // const victoryConditions = (() => {
    //     const rowWin = [];
    //     const columnWin = [];
    //     const diagonalWin = [];
    // })();

    const isGameOver = () => {
        if (isBoardFull === true) {
            return true;
        }
        // else if () {
        //     victory conditions met
        //     return true
        // }
    };


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