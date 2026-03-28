import Player from "./player.js";

export default class GameController {
    constructor() {
        this.player1 = new Player('Human', 'human');
        this.player2 = new Player('Computer', 'computer');
        this.currentPlayer = this.player1;
    }

    switchTurn() {
        if (this.currentPlayer === this.player1) {
            this.currentPlayer = this.player2;
        } else {
            this.currentPlayer = this.player1;
        }
    }

    playerAttack(x, y) {
        let opponent = this.getOpponent();
        opponent.gameboard.receiveAttack(x, y);
        this.switchTurn()
    }

    getOpponent() {
        if (this.currentPlayer === this.player1) {
            return this.player2;
        } else {
            return this.player1;
        }
    }

    isGameOver() {
    return this.player1.gameboard.allShipsSunk() || this.player2.gameboard.allShipsSunk();
    }
}