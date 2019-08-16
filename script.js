'use strict'

const gameBoard = (() => {
    const renderBoard = ((cellNumber) => {
        for (let i = 0; i < cellNumber; i++) {
            let gridContainer = document.querySelector('.grid-container');
            let gridCell = document.createElement('div');
            gridCell.classList.add('grid-cell');
            if (i < 3) {
                gridCell.setAttribute('id', `x:${i + 1} y:3`)
            } else if (i < 6) {
                gridCell.setAttribute('id', `x:${i + 1 - 3} y:2`)
            } else if (i < 9) {
                gridCell.setAttribute('id', `x:${i + 1 - 6} y:1`)
            }

            gridContainer.appendChild(gridCell);
        }
    })(9);
})();


const protoPlayer = (team, playerClass, status) => {

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

    gridCells.forEach(cell => cell.addEventListener('mousedown', (e) => {
        if (!e.target.classList.contains('claimed')) {
            playerToggle();
        }
    }
    ));

    function checkVerticalVictory(xValue, yValue) {
        if (cellsClaimed.toString().includes(`x:${xValue} y:${yValue}`)
            && cellsClaimed.toString().includes(`x:${xValue} y:${yValue + 1}`)
            && cellsClaimed.toString().includes(`x:${xValue} y:${yValue + 2}`)) {
            return true;
        }
    }

    function checkHorizontalVictory(xValue, yValue) {
        if (cellsClaimed.toString().includes(`x:${xValue} y:${yValue}`)
            && cellsClaimed.toString().includes(`x:${xValue + 1} y:${yValue}`)
            && cellsClaimed.toString().includes(`x:${xValue + 2} y:${yValue}`)) {
            return true;
        }
    }

    function checkDiagonalVictory() {
        if (cellsClaimed.toString().includes(`x:${1} y:${1}`)
            && cellsClaimed.toString().includes(`x:${2} y:${2}`)
            && cellsClaimed.toString().includes(`x:${3} y:${3}`)) {
            return true;
        } else if (cellsClaimed.toString().includes(`x:${1} y:${3}`)
            && cellsClaimed.toString().includes(`x:${2} y:${2}`)
            && cellsClaimed.toString().includes(`x:${3} y:${1}`)) {
            return true;
        }
    }

    function clearGridListeners() {
        const gridContainer = document.querySelector('.grid-container');
        const gridClone = gridContainer.cloneNode(true);
        gridContainer.parentNode.replaceChild(gridClone, gridContainer);
    }

    const declareWinner = (() => {
        gridCells.forEach(cell => cell.addEventListener('click', (e) => {
            const headline = document.querySelector('h1');
            const MAX_MOVES = 5;
            if (cellsClaimed.length >= 3) {
                for (let i = 1; i <= 3; i++) {
                    for (let j = 1; j <= 3; j++) {
                        if (checkVerticalVictory(i, j)) {
                            headline.textContent = `Winner: Team ${team}!`
                            clearGridListeners();
                        } else if (checkHorizontalVictory(i, j)) {
                            headline.textContent = `Winner: Team ${team}!`
                            clearGridListeners();
                        } else if (cellsClaimed.length === MAX_MOVES) {
                            headline.textContent = 'It\'s a Tie!';
                            clearGridListeners();
                        }
                    }
                }
                if (checkDiagonalVictory()) {
                    headline.textContent = `Winner: Team ${team}!`
                    clearGridListeners();
                } else if (cellsClaimed.length === MAX_MOVES) {
                    headline.textContent = 'It\'s a Tie!';
                    clearGridListeners();
                }
            }
        }));
    })();
    return { team, cellsClaimed, };
}

const initialPlayers = (() => {
    const playerX = protoPlayer('X', 'active-x', 'on');
    const playerO = protoPlayer('O', 'active-o', 'off');

    return { playerX, playerO }
})();

const refreshAssignment = (() => {
    const refreshPage = () => window.location.reload();
    const clearButton = document.querySelector('#clear')
    clearButton.addEventListener('click', refreshPage);
})();