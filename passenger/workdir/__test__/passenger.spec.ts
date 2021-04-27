import task from "../task/app";
import { prefilled } from "./mock";

describe("Test for function structure", () => {
  let expected = task(50, 0);
  it("Returns an object for even distro", () => {
    expect(expected).toHaveProperty('boarded');
    expect(expected).toHaveProperty('count');
    expect(expected).toHaveProperty('reservation');
  });

  it("checks that the function is called with 2 arguments", () => {
    expect(task.length).toBe(2);
  });
});

describe("Test for function expected value", () => {
  let expected = task(50, 0);

  it("Returns evenly distributed values for boarded", () => {
    interface Even {
      [propName:string]: number
    }

    const even: Even = {};

    interface Passenger {
      name: string,
      location: string
    }

    expected.boarded.forEach((passenger: Passenger) => {
      if (!even.hasOwnProperty(passenger.location)) {
        even[passenger.location] = 1;
      } else {
        even[passenger.location]++;
      }
    });

    const locations = ["Abuja", "Benue", "Kastina", "Lagos", "Sambisa"];

    const truthy = locations.every((location) => even[location] === expected.boarded.length / 5)
    expect(truthy).toBe(true)
  });

  it("Returns reservation list for uneven distro", () => {
    let expected = task(14, 4);

    expect(expected.reservation).toHaveLength(4)
  });

  it("boarded does not exceed 50 people for 60 passengers with shuffle of 0", () => {
    let expected = task(60, 0);

    expect(expected.boarded.length).toBe(50)
  });
});

describe("test for shuffle", () => {
  it("Single shuffle works ", () => {
    let expected = task(55, 1);

    let board =
    [ { name: 'passenger51', location: 'Abuja' }, 
      { name: 'passenger52', location: 'Benue' }, 
      { name: 'passenger53', location: 'Kastina' }, 
      { name: 'passenger54', location: 'Lagos' }, 
      { name: 'passenger55', location: 'Sambisa' } ];

    expect(expected.boarded).toStrictEqual(board);
    expect(expected.count).toBe(2);
  });

  it("first multiple shuffle works ", () => {
    let expected = task(105, 2);

    let board =
    [ { name: 'passenger101', location: 'Abuja' }, 
      { name: 'passenger102', location: 'Benue' }, 
      { name: 'passenger103', location: 'Kastina' }, 
      { name: 'passenger104', location: 'Lagos' }, 
      { name: 'passenger105', location: 'Sambisa' } ];

    expect(expected.boarded).toStrictEqual(board);
    expect(expected.count).toBe(3);
  });

  it("second multiple shuffle works ", () => {
    let expected = task(155, 3);

    let board =
    [ { name: 'passenger151', location: 'Abuja' }, 
      { name: 'passenger152', location: 'Benue' }, 
      { name: 'passenger153', location: 'Kastina' }, 
      { name: 'passenger154', location: 'Lagos' }, 
      { name: 'passenger155', location: 'Sambisa' } ];

    expect(expected.boarded).toStrictEqual(board);
    expect(expected.count).toBe(4);
  });

  it("third multiple shuffle works ", () => {
    let expected = task(205, 4);

    let board =
    [ { name: 'passenger201', location: 'Abuja' }, 
      { name: 'passenger202', location: 'Benue' }, 
      { name: 'passenger203', location: 'Kastina' }, 
      { name: 'passenger204', location: 'Lagos' }, 
      { name: 'passenger205', location: 'Sambisa' } ];

    expect(expected.boarded).toStrictEqual(board);
    expect(expected.count).toBe(5);
  });
});

describe("test for boarded value with passengers of 50 and shuffle 0", () => {
  let passengers = 50;
  let shuffle = 0;

  const expected = task(passengers, shuffle);
  expect(expected.boarded).toStrictEqual(prefilled);
});
