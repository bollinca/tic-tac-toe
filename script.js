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

    const isWinner = (() => {
        gridCells.forEach(cell => cell.addEventListener('click', (e) => {
            if (cellsClaimed.length >= 3) {
                for (let i = 1; i <= 3; i++) {
                    for (let j = 1; j <= 3; j++) {
                        if (cellsClaimed.toString().includes(`x:${i} y:${j}`)
                            && cellsClaimed.toString().includes(`x:${i} y:${j + 1}`)
                            && cellsClaimed.toString().includes(`x:${i} y:${j + 2}`)) {
                            console.log(`${team} victory!`);
                        } else if (cellsClaimed.toString().includes(`x:${i} y:${j}`)
                            && cellsClaimed.toString().includes(`x:${i + 1} y:${j}`)
                            && cellsClaimed.toString().includes(`x:${i + 2} y:${j}`)) {
                            console.log(`${team} victory!`);
                        }
                    }
                }
                if (cellsClaimed.toString().includes(`x:${1} y:${1}`)
                    && cellsClaimed.toString().includes(`x:${2} y:${2}`)
                    && cellsClaimed.toString().includes(`x:${3} y:${3}`)) {
                    console.log(`${team} victory!`);
                } else if (cellsClaimed.toString().includes(`x:${1} y:${3}`)
                    && cellsClaimed.toString().includes(`x:${2} y:${2}`)
                    && cellsClaimed.toString().includes(`x:${3} y:${1}`)) {
                    console.log(`${team} victory!`);
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