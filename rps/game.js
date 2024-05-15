export class Player {
    constructor(userName) {
        this.name = userName;
        this.turn = true;
        this.score = 0;
        this.choise = "";
    }
    changeTurn() {
        this.turn = !this.turn;
    }
}

export function cpChoise() {
    let randomchoise = ["rock", "paper", "scissors"];
    let index = Math.floor(Math.random() * 3);
    return randomchoise[index]
}

export function clear() {
    document.getElementById("cpchois").innerHTML = "";
    document.getElementById("yourchois").innerHTML = "";
}