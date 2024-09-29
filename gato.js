let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'O'; // O comienza
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const cells = document.querySelectorAll('.cell');
const downloadButton = document.getElementById('downloadButton');
const modal = document.getElementById('modal');
const closeModal = document.querySelector('.close');

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

function handleCellClick(event) {
    const clickedCell = event.target;
    const index = clickedCell.getAttribute('data-index');

    if (board[index] !== '' || !gameActive) {
        return;
    }

    board[index] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    checkResult();
}

function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] === '' || board[b] === '' || board[c] === '') {
            continue;
        }
        if (board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        if (currentPlayer === 'O') {
            downloadButton.style.display = 'block';
        } else {
            modal.style.display = 'block';
        }
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'O' ? 'X' : 'O';
}

closeModal.onclick = function() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

downloadButton.addEventListener('click', () => {
    const videoUrl = 'Video/Miverdadero-unico-amor.mp4'
    const a = document.createElement('a');
    a.href = videoUrl;
    a.download = 'Mi verdadero-unico-amor.mp4';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});
