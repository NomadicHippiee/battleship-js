import Player from './player.js';
import Gameboard from './gameboard.js';

describe('Player', () => {

  test('should create a player with name and type', () => {
    const player = new Player('Alice', 'human');
    expect(player.name).toBe('Alice');
    expect(player.type).toBe('human');
  });

  test('should have a gameboard', () => {
    const player = new Player('Bob', 'computer');
    expect(player.gameboard).toBeInstanceOf(Gameboard);
  });

  test('should return true if player is computer', () => {
    const player = new Player('AI', 'computer');
    expect(player.isComputer()).toBe(true);
  });

  test('should return false if player is human', () => {
    const player = new Player('Alice', 'human');
    expect(player.isComputer()).toBe(false);
  });

});