import Ship from "../src/ship";

const ship = new Ship(6);

ship.hit();
ship.hit();
ship.hit(); // hit the ship 3 times

test("Hit function test", () => {
  expect(ship.hits).toBe(3); // ship is hit 3 times for test
});

test("Is ship sunk test", () => {
  expect(ship.isSunk()).toBeFalsy();

  ship.hit();
  ship.hit();
  ship.hit(); // hit the ship 3 times again to sink

  expect(ship.isSunk()).toBeTruthy();
});

test("Is ship vertical?", () => {
  const carrier = new Ship(6); // ships are vertical by default rotate function is updating vertical status
  expect(carrier.vertical).toBeTruthy();
  carrier.rotate();
  expect(carrier.vertical).toBeFalsy();
  carrier.rotate();
  expect(carrier.vertical).toBeTruthy();
});
