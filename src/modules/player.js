import Gameboard from "./gameboard.js";

export default class Player {
    constructor(name, type) {
        this.name = name;
        this.type = type; 
        this.gameboard = new Gameboard();
    }
    isComputer() {
        if (this.type === 'computer') {
            return true;
        } else {
            return false;
        }
    }

}