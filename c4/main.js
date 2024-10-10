import { getBackgroundPhoto } from "./UIactions.js";
import { Player } from "./player.js";
import {
  dimondLengthCal,
  posibleCellScoring,
  cpGuess,
  equalMode,
} from "./gameMechanics.js";

/////////////////////////////////////////// preparing the page ////////////
// getBackgroundPhoto();

////////////// get user name from first page
function getQueryParam(nameInURL) {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get(nameInURL) != "") {
    return urlParams.get(nameInURL);
  } else {
    return "Player";
  }
}
let playerNameInputed = getQueryParam("playerNameInputed");
let player1 = new Player(playerNameInputed);
player1.turn = !player1.turn;
let player2 = new Player("computer");
document.querySelector("#player1Name").innerText = playerNameInputed;
// document.querySelector('#player1Image').setAttribute('src', `https://source.boringavatars.com/beam/60/${playerNameInputed}`)

let playerTurnOnBoard = document.getElementById("playernameturn");
playerTurnOnBoard.innerText = player1.playerName;
//////////////////////////////////////////////// update palayer turn ////////////////
function updatePlayerTurn() {
  if (!player1.win && !player2.win) {
    player1.turn = !player1.turn;
    player2.turn = !player2.turn;
    if (player1.turn) {
      playerTurnOnBoard.innerText = player1.playerName;
    } else {
      playerTurnOnBoard.innerText = player2.playerName;
    }
  }
}
////////////////////////////////////////// store data for reloading page ///////////////////
function storGameBoard() {
  localStorage.setItem("matrixBoardSaved", `${JSON.stringify(matrixBoard)}`);
  localStorage.setItem(
    "fulledCellQuantitySaved",
    `${JSON.stringify(fulledCellQuantity)}`
  );
}
function loadGameBoard() {
  let matrixBoardLoaded = localStorage.getItem("matrixBoardSaved");
  let fulledCellQuantityLoaded = localStorage.getItem(
    "fulledCellQuantitySaved"
  );
  if (matrixBoardLoaded) {
    matrixBoard = JSON.parse(matrixBoardLoaded);
    fulledCellQuantity = JSON.parse(fulledCellQuantityLoaded);

    for (let i = 0; i < matrixBoard.length; i++) {
      for (let j = 0; j < matrixBoard[i].length; j++) {
        if (matrixBoard[i][j] == "cpD") {
          let downRowImage = document.createElement("img");
          downRowImage.src = "./images/bluedimond.png";
          document
            .querySelector(`.cell[data-x="${i}"][data-y="${j}"]`)
            .appendChild(downRowImage);
        } else if (matrixBoard[i][j] == "userD") {
          let downRowImage = document.createElement("img");
          downRowImage.src = "./images/greendimond.png";
          document
            .querySelector(`.cell[data-x="${i}"][data-y="${j}"]`)
            .appendChild(downRowImage);
        }
      }
    }
  }
}
document.addEventListener("DOMContentLoaded", loadGameBoard);

/////////////////////////// buttons action //////////////////////
document.getElementById("homeButten").addEventListener("click", (event) => {
  if (localStorage.getItem("matrixBoardSaved")) {
    localStorage.removeItem("matrixBoardSaved");
    localStorage.removeItem("fulledCellQuantitySaved");
  }
});

document.getElementById("playAgain").addEventListener("click", (event) => {
  document.getElementById("blurLast").id = "";
  document.getElementById("modalLast").id = "";
  fulledCellQuantity = [0, 0, 0, 0, 0, 0, 0];
  matrixBoard = [[], [], [], [], [], [], []];

  document.querySelectorAll(".cell ").forEach(function (cell) {
    let dimondWaitingToClear = cell.querySelectorAll("img");
    if (dimondWaitingToClear.length > 1) {
      dimondWaitingToClear[1].remove();
    }
  });

  document.querySelectorAll("tr").forEach((tr) => tr.remove());
  player1.turn = player1.win;
  player2.turn = player2.win;
  player1.win = false;
  player2.win = false;
  cpTurn();
});

//////////////////// top row dimond ////////////////////
let topRowImage;
function creatTopRowDimond(x) {
  topRowImage = document.createElement("img");
  topRowImage.className = "topRowImage";
  document.querySelector(`.topRow[data-x="${x}"]`).appendChild(topRowImage);
  topRowImage.src = "./images/greendimond.png";
}
creatTopRowDimond(3);

////////////////////change top dimond location////////////////////
let mouseWorking = true;
let cells = document.querySelectorAll(".cell");
cells.forEach((cell) => {
  cell.addEventListener("mouseenter", enterTopRow);
  function enterTopRow() {
    if (mouseWorking) {
      topRowImage.remove();
      let xCell = cell.getAttribute("data-x");
      creatTopRowDimond(xCell);
    }
  }
});

////////////////////drop down dimond////////////////////
let xCell;
let yCell;
let fulledCellQuantity = [0, 0, 0, 0, 0, 0, 0];
let matrixBoard = [[], [], [], [], [], [], []];
function updateFulledCellQuantity(x) {
  if (fulledCellQuantity[x] <= 5) {
    fulledCellQuantity[x]++;
    parseFloat(fulledCellQuantity[x]);
    return true;
  } else {
    alert("this column is full");
    return false;
  }
}
///////////// just make delay
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

cells.forEach((cell) => {
  cell.addEventListener("click", fallingTopRow);
  async function fallingTopRow() {
    if (player1.turn) {
      xCell = parseFloat(cell.getAttribute("data-x"));
      if (updateFulledCellQuantity(xCell)) {
        mouseWorking = false;
        let downRowImage = document.createElement("img");
        downRowImage.src = "./images/greendimond.png";
        yCell = parseFloat(fulledCellQuantity[xCell] - 1);
        let height = 6 - yCell;
        document.documentElement.style.setProperty("--height", height);
        topRowImage.id = "shadowCell";
        await delay(900);
        document
          .querySelector(`.cell[data-x="${xCell}"][data-y="${yCell}"]`)
          .appendChild(downRowImage);
        matrixBoard[xCell][fulledCellQuantity[xCell] - 1] = "userD";
        dimondLengthCal();
        equalMode();
        updatePlayerTurn();
        storGameBoard();
        mouseWorking = true;
        setTimeout(cpTurn, 2000);
      }
    }
  }
});

function cpTurn() {
  if (player2.turn) {
    let downRowImage = document.createElement("img");
    downRowImage.src = "./images/bluedimond.png";
    posibleCellScoring();
    xCell = cpGuess();
    updateFulledCellQuantity(xCell);
    yCell = fulledCellQuantity[xCell] - 1;
    document
      .querySelector(`.cell[data-x="${xCell}"][data-y="${yCell}"]`)
      .appendChild(downRowImage);
    matrixBoard[xCell][yCell] = "cpD";
    dimondLengthCal();
    equalMode();
    updatePlayerTurn();
    storGameBoard();
  }
}

export {
  xCell,
  yCell,
  matrixBoard,
  fulledCellQuantity,
  player1,
  player2,
  playerTurnOnBoard,
};
