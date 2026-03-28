import GameController from './gamecontroller.js';
import Player from './player.js';
import Ship from './ship.js';

describe('GameController', () => {

  test('should create game with two players', () => {
    const game = new GameController();
    expect(game.player1).toBeDefined();
    expect(game.player2).toBeDefined();
  });

  test('should set current player to player1 at start', () => {
    const game = new GameController();
    expect(game.currentPlayer).toBe(game.player1);
  });

  test('should switch current player after turn', () => {
    const game = new GameController();
    game.switchTurn();
    expect(game.currentPlayer).toBe(game.player2);
  });

  test('should return false for isGameOver() at start', () => {
    const game = new GameController();
    expect(game.isGameOver()).toBe(false);
  });

  test('should return true for isGameOver() when all opponent ships sunk', () => {
    const game = new GameController();
    const ship = new Ship(1);
    game.player2.gameboard.placeShip(ship, 0, 0, 'horizontal');
    game.playerAttack(0, 0);
    expect(game.isGameOver()).toBe(true);
  });

});