console.log('Fine');

var origBoard;
var whoTurn;
var end;
const humanPlayer = '0';
const aiPlayer = 'X';
const winCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
]

const cells = document.querySelectorAll('.cell');
startGame();

function startGame() {
    origBoard = new Array(9);
    whoTurn = true;
    end = false;

    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = '';
        cells[i].style.removeProperty('background-color');
        cells[i].addEventListener('click', turnClick, false);
        origBoard[i] = null;
    }
}

function turnClick(square) {
    if (end) {
        return;
    }
    if (origBoard[square.target.id] == null) {
        if (whoTurn) {
            turn(square.target.id, humanPlayer);
            whoTurn = false;
            document.getElementById('turn').innerText = "Player 1's Turn";
            document.getElementById('turn').style.color = "#2A68FF";
        } else {
            turn(square.target.id, aiPlayer);
            whoTurn = true;
            document.getElementById('turn').innerText = "Player 2's Turn";
            document.getElementById('turn').style.color = "#FF2A4D";
        }
        if (!end) {
            document.getElementById('info').innerText = 'Click the box!';
        }
    } else {
        document.getElementById('info').innerText = 'Please click elsewhere.';
    }

}

function turn(squareID, player) {
    origBoard[squareID] = player;
    document.getElementById(squareID).innerText = player;

    if (checkWin(origBoard, player)) {
        if (player == humanPlayer) {
            document.getElementById('info').innerText = 'Player 1 won!';
        } else {
            document.getElementById('info').innerText = 'Player 2 won!';
        }
        end = true;
    }
}

function checkWin(board, player) {
    for (let i = 0; i < winCombos.length; i++) {
        let result = true;
        for (let n = 0; n < 3; n++) {
            if (origBoard[winCombos[i][n]] !== player) {
                result = false;
            }
        }
        if (result) {
            return true;
        }
    }
    return false;
}
