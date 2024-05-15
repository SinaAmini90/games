import { xCell, yCell, matrixBoard, fulledCellQuantity } from "./main.js";
import { gameOver, gameOverEqual } from "./UIactions.js";

///////////////equal mode functions///////////////////
function arraysAreEqual(arr1, arr2) {
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}

function equalMode() {

    if (arraysAreEqual(fulledCellQuantity, [6, 6, 6, 6, 6, 6, 6])) {
        gameOverEqual();
    }
}
////////////////////calculate dimond string length////////////////////
let userDLength;
function dimondLengthCal() {
    ///////////row check
    let rightMoving = 0;
    let upMoving = 0;
    let i = xCell;
    let j = yCell;
    userDLength = 0;
    let dropedDimond = matrixBoard[i][j];
    while (i >= 0 && matrixBoard[i][j] == dropedDimond) {
        userDLength++
        i--
        rightMoving--
    }
    i = xCell;
    j = yCell;
    userDLength--
    while (i <= 6 && matrixBoard[i][j] == dropedDimond) {
        userDLength++
        i++
        rightMoving++
    }
    if (userDLength >= 4) {
        let xFirst = xCell + ((rightMoving - 3) / 2);
        let yFirst = yCell;

        document.querySelector(`.cell[data-x="${xFirst}"][data-y="${yFirst}"] img:nth-of-type(2)`).setAttribute('id', 'connect');
        document.querySelector(`.cell[data-x="${xFirst + 1}"][data-y="${yFirst}"] img:nth-of-type(2)`).setAttribute('id', 'connect');
        document.querySelector(`.cell[data-x="${xFirst + 2}"][data-y="${yFirst}"] img:nth-of-type(2)`).setAttribute('id', 'connect');
        document.querySelector(`.cell[data-x="${xFirst + 3}"][data-y="${yFirst}"] img:nth-of-type(2)`).setAttribute('id', 'connect');
        gameOver();
    }
    ///////////column check
    rightMoving = 0;
    upMoving = 0;
    userDLength = 0;
    i = xCell;
    j = yCell;
    while (j >= 0 && matrixBoard[i][j] == dropedDimond) {
        userDLength++
        j--
        upMoving--
    }
    if (userDLength >= 4) {

        let xFirst = xCell;
        let yFirst = yCell + upMoving + 1;

        document.querySelector(`.cell[data-x="${xFirst}"][data-y="${yFirst}"] img:nth-of-type(2)`).setAttribute('id', 'connect');
        document.querySelector(`.cell[data-x="${xFirst}"][data-y="${yFirst + 1}"] img:nth-of-type(2)`).setAttribute('id', 'connect');
        document.querySelector(`.cell[data-x="${xFirst}"][data-y="${yFirst + 2}"] img:nth-of-type(2)`).setAttribute('id', 'connect');
        document.querySelector(`.cell[data-x="${xFirst}"][data-y="${yFirst + 3}"] img:nth-of-type(2)`).setAttribute('id', 'connect');
        gameOver();
    }
    /////////// x ascending check
    rightMoving = 0;
    upMoving = 0;
    userDLength = 0;
    i = xCell;
    j = yCell;
    while (i >= 0 && j >= 0 && matrixBoard[i][j] == dropedDimond) {
        userDLength++
        i--
        j--
        rightMoving--
        upMoving--
    }
    userDLength--;
    i = xCell;
    j = yCell;
    while (i <= 6 && j <= 5 && matrixBoard[i][j] == dropedDimond) {
        userDLength++
        i++
        j++
        rightMoving++
        upMoving++
    }
    if (userDLength >= 4) {

        let xFirst = xCell + ((rightMoving - 3) / 2);
        let yFirst = yCell + ((upMoving - 3) / 2);

        document.querySelector(`.cell[data-x="${xFirst}"][data-y="${yFirst}"] img:nth-of-type(2)`).setAttribute('id', 'connect');
        document.querySelector(`.cell[data-x="${xFirst + 1}"][data-y="${yFirst + 1}"] img:nth-of-type(2)`).setAttribute('id', 'connect');
        document.querySelector(`.cell[data-x="${xFirst + 2}"][data-y="${yFirst + 2}"] img:nth-of-type(2)`).setAttribute('id', 'connect');
        document.querySelector(`.cell[data-x="${xFirst + 3}"][data-y="${yFirst + 3}"] img:nth-of-type(2)`).setAttribute('id', 'connect');
        gameOver();
    }
    /////////// x desending check
    rightMoving = 0;
    upMoving = 0;
    userDLength = 0;
    i = xCell;
    j = yCell;
    while (i <= 6 && j >= 0 && matrixBoard[i][j] == dropedDimond) {
        userDLength++
        i++
        j--
        rightMoving++
        upMoving--
    }
    userDLength--;
    i = xCell;
    j = yCell;
    while (i >= 0 && j <= 5 && matrixBoard[i][j] == dropedDimond) {
        userDLength++
        i--
        j++
        rightMoving--
        upMoving++
    }
    if (userDLength >= 4) {

        let xFirst = xCell + ((rightMoving - 3) / 2);
        let yFirst = yCell + ((upMoving + 3) / 2);

        document.querySelector(`.cell[data-x="${xFirst}"][data-y="${yFirst}"] img:nth-of-type(2)`).setAttribute('id', 'connect');
        document.querySelector(`.cell[data-x="${xFirst + 1}"][data-y="${yFirst - 1}"] img:nth-of-type(2)`).setAttribute('id', 'connect');
        document.querySelector(`.cell[data-x="${xFirst + 2}"][data-y="${yFirst - 2}"] img:nth-of-type(2)`).setAttribute('id', 'connect');
        document.querySelector(`.cell[data-x="${xFirst + 3}"][data-y="${yFirst - 3}"] img:nth-of-type(2)`).setAttribute('id', 'connect');
        gameOver();
    }
}


//////////////////// cp choise method ////////////////////
let scoreForVirtualDimod = [[], [], [], [], [], [], []];
let dimondLengthVirtual = 0;


function updateScoreForVirtualDimod(columnGuess) {
    scoreForVirtualDimod[columnGuess].push(dimondLengthVirtual ** 4);
}

function posibleCellScoring() {
    scoreForVirtualDimod = [[], [], [], [], [], [], []];
    let dimonds = ["cpD", "userD"];
    for (let dimondsIndex = 0; dimondsIndex <= 1; dimondsIndex++) {
        for (let columnGuess = 0; columnGuess <= 6; columnGuess++) {
            ///////////row check
            let i = columnGuess;
            let j = fulledCellQuantity[i];
            dimondLengthVirtual = 0;
            let vritualDimond = dimonds[dimondsIndex];
            switch (j) {
                case 6:
                    dimondLengthVirtual = 0;
                    break;
                default:
                    do {
                        dimondLengthVirtual++
                        i--
                    } while (i >= 0 && matrixBoard[i][j] == vritualDimond)
                    i = columnGuess;
                    j = fulledCellQuantity[i];
                    dimondLengthVirtual--
                    do {
                        dimondLengthVirtual++
                        i++
                    } while (i <= 6 && matrixBoard[i][j] == vritualDimond)
            }
            updateScoreForVirtualDimod(columnGuess);
            ///////////column check
            userDLength = 0;
            i = columnGuess;
            j = fulledCellQuantity[i];
            dimondLengthVirtual = 0;
            switch (j) {
                case 6:
                    dimondLengthVirtual = 0;
                    break;
                default:
                    do {
                        dimondLengthVirtual++
                        j--
                    } while (j >= 0 && matrixBoard[i][j] == vritualDimond)
            }
            updateScoreForVirtualDimod(columnGuess);
            /////////// x ascending check
            userDLength = 0;
            i = columnGuess;
            j = fulledCellQuantity[i];
            dimondLengthVirtual = 0;
            switch (j) {
                case 6:
                    dimondLengthVirtual = 0;
                    break;
                default:
                    do {
                        dimondLengthVirtual++
                        i--
                        j--
                    } while (i >= 0 && j >= 0 && matrixBoard[i][j] == vritualDimond)
                    i = columnGuess;
                    j = fulledCellQuantity[i];
                    dimondLengthVirtual--
                    do {
                        dimondLengthVirtual++
                        i++
                        j++
                    } while (i <= 6 && j <= 5 && matrixBoard[i][j] == vritualDimond)
            }
            updateScoreForVirtualDimod(columnGuess);
            /////////// x desending check
            userDLength = 0;
            i = columnGuess;
            j = fulledCellQuantity[i];
            dimondLengthVirtual = 0;
            switch (j) {
                case 6:
                    dimondLengthVirtual = 0;
                    break;
                default:
                    do {
                        dimondLengthVirtual++
                        i++
                        j--
                    } while (i <= 6 && j >= 0 && matrixBoard[i][j] == vritualDimond)
                    i = columnGuess;
                    j = fulledCellQuantity[i];
                    dimondLengthVirtual--
                    do {
                        dimondLengthVirtual++
                        i--
                        j++
                    } while (i >= 0 && j <= 5 && matrixBoard[i][j] == vritualDimond)
            }
            updateScoreForVirtualDimod(columnGuess);
        }
    }

    scoreForVirtualDimod = scoreForVirtualDimod.map(score => score.reduce((pv, cv) => pv + cv, 0));
    scoreForVirtualDimod[0]--
    scoreForVirtualDimod[6]--
    cpGuess();
}

///////////////choose best cell for cp ///////////////
function cpGuess() {

    let maxScoreIndexs = [];
    let maxScore = Math.max(...scoreForVirtualDimod);
    for (let i = 0; i <= 6; i++) {
        if (scoreForVirtualDimod[i] == maxScore) {
            maxScoreIndexs.push(i);
        }
    }

    let xchoise = maxScoreIndexs[Math.floor(Math.random() * maxScoreIndexs.length)];
    return xchoise
};

export { dimondLengthCal, posibleCellScoring, cpGuess, equalMode };