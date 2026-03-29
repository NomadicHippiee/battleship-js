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
        // Check if already attacked this coordinate
        const opponent = this.getOpponent();
        const alreadyAttacked = opponent.gameboard.wasAttacked(x, y);
        
        if (alreadyAttacked !== null) {
            console.log('Already attacked this coordinate!');
            return false; // Attack failed
        }
        
        opponent.gameboard.receiveAttack(x, y);
        this.switchTurn();
        return true; // Attack succeeded
    }

    computerAttack() {
        const opponent = this.getOpponent();
        let x, y, validMove;

        // Keep trying random coordinates until finding an unattacked one
        do {
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);
            validMove = opponent.gameboard.wasAttacked(x, y) === null;
        } while (!validMove);

        opponent.gameboard.receiveAttack(x, y);
        this.switchTurn();
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