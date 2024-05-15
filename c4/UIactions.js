import { player1, player2 } from "./main.js";

function gameOverEqual() {
    player1.playerEqual();
    setTimeout(applayScoreBoard, 2000);
}

function gameOver() {

    if (player1.turn) {
        player1.playerWin();
        player2.playerLoss();
    } else {
        player2.playerWin();
        player1.playerLoss();
    }

    setTimeout(applayScoreBoard, 2000);
};
function applayScoreBoard() {
    ///////////////////erase non score data //////////////////
    localStorage.removeItem('matrixBoardSaved');
    localStorage.removeItem('fulledCellQuantitySaved');

    localStorage.setItem(`${player1.playerName}`, `${player1.score}`);
    // localStorage.setItem(`${player2.playerName}`, `${player2.score}`);

    document.querySelector(".blurLast").setAttribute("id", "blurLast");
    let modalWindow = document.querySelector(".modalLast");
    modalWindow.setAttribute("id", "modalLast");
    let tableOfModalWindow = document.querySelector(".modalLast table");
    let tableTitle = document.createElement('tr');
    let playerTitle = document.createElement('th');
    playerTitle.textContent = 'Palayer';
    tableTitle.appendChild(playerTitle);
    let scoreTitle = document.createElement('th');
    scoreTitle.textContent = 'Score';
    tableTitle.appendChild(scoreTitle);
    tableOfModalWindow.appendChild(tableTitle);
    for (let i = 0; i < localStorage.length; i++) {
        let name = localStorage.key(i);
        let score = localStorage.getItem(name);

        let tableRow = document.createElement('tr');

        let tableCellName = document.createElement('td');
        tableCellName.textContent = name;
        tableRow.appendChild(tableCellName);

        let tableCellScore = document.createElement('td');
        tableCellScore.textContent = score;
        tableRow.appendChild(tableCellScore);

        tableOfModalWindow.appendChild(tableRow);
    }
    let modalWindowText = document.querySelector('.modalLast p');
    if (player1.win) {
        modalWindowText.innerText = `congratulations, ${player1.playerName} win!`;
    } else {
        modalWindowText.innerText = `Unfortunately, ${player2.playerName} win!`;
    };
}

//////////////////////////////get background image /////////////
let backImageAddress = `url('./images/back.jpg')`;
let gameBackGround = document.getElementsByTagName('body')[0];
gameBackGround.style.backgroundImage = backImageAddress;
const unsplashAccessKey = `StYrqbKcS3_YJEavWxC3rS9D7eB4Fngm7p97xcXow0g`;
let backImageJson = "";
async function getBackgroundPhoto() {
    const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${unsplashAccessKey}&orientation=landscape&topics='Wallpapers'`);
    if (response.ok) {
        backImageJson = await response.json();
        backImageAddress = `${backImageJson.urls.regular}`;
        gameBackGround.style.backgroundImage = `url(${backImageAddress})`;
    } else {
        console.log("something went wrong");
    };
};


export { gameOver, getBackgroundPhoto, gameOverEqual };