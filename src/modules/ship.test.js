import Ship from "./ship.js";

describe("Ship", () => {
  test("should create a ship with a given length", () => {
    const ship = new Ship(5);
    expect(ship.length).toBe(5);
  });

  test("should initialize with 0 hits", () => {
    const ship = new Ship(3);
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(false);
  });

  test("should record a hit when hit() is called", () => {
    const ship = new Ship(3);
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(false);
  });

  test("should sink when hits equal its length", () => {
    const ship = new Ship(3);
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });

  test("should return false for isSunk() when not fully hit", () => {
    const ship = new Ship(5);
    ship.hit();
    expect(ship.isSunk()).toBe(false);
  });
});
