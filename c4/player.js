class Player {
    constructor(playerName) {
        this.playerName = playerName;
        this.turn = false;
        this.win = false;
        this.score = 0;
    }
    finishPlayerTurn() {
        this.turn = false;
    }
    playerWin() {
        this.win = true;
        let lastScore = parseFloat(localStorage.getItem(`${this.playerName}`));
        if (lastScore > 0) {
            this.score = lastScore + 3;
        } else {
            this.score = 3;
        }
    };
    playerLoss() {
        let lastScore = parseFloat(localStorage.getItem(`${this.playerName}`));
        if (lastScore > 0) {
            this.score = lastScore;
        } else {
            this.score = 0;
        }
    }
    playerEqual() {
        this.win = true;
        let lastScore = parseFloat(localStorage.getItem(`${this.playerName}`));
        if (lastScore > 0) {
            this.score = lastScore + 1;
        } else {
            this.score = 1;
        }

    }
};

export { Player };