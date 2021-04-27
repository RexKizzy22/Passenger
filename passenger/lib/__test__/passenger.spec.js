"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("../task/app"));
var mock_1 = require("./mock");
describe("Test for function structure", function () {
    var expected = app_1.default(50, 0);
    it("Returns an object for even distro", function () {
        expect(expected).toHaveProperty('boarded');
        expect(expected).toHaveProperty('count');
        expect(expected).toHaveProperty('reservation');
    });
    it("checks that the function is called with 2 arguments", function () {
        expect(app_1.default.length).toBe(2);
    });
});
describe("Test for function expected value", function () {
    var expected = app_1.default(50, 0);
    it("Returns evenly distributed values for boarded", function () {
        var even = {};
        expected.boarded.forEach(function (passenger) {
            if (!even.hasOwnProperty(passenger.location)) {
                even[passenger.location] = 1;
            }
            else {
                even[passenger.location]++;
            }
        });
        var locations = ["Abuja", "Benue", "Kastina", "Lagos", "Sambisa"];
        var truthy = locations.every(function (location) { return even[location] === expected.boarded.length / 5; });
        expect(truthy).toBe(true);
    });
    it("Returns reservation list for uneven distro", function () {
        var expected = app_1.default(14, 4);
        expect(expected.reservation).toHaveLength(4);
    });
    it("boarded does not exceed 50 people for 60 passengers with shuffle of 0", function () {
        var expected = app_1.default(60, 0);
        expect(expected.boarded.length).toBe(50);
    });
});
describe("test for shuffle", function () {
    it("Single shuffle works ", function () {
        var expected = app_1.default(55, 1);
        var board = [{ name: 'passenger51', location: 'Abuja' },
            { name: 'passenger52', location: 'Benue' },
            { name: 'passenger53', location: 'Kastina' },
            { name: 'passenger54', location: 'Lagos' },
            { name: 'passenger55', location: 'Sambisa' }];
        expect(expected.boarded).toStrictEqual(board);
        expect(expected.count).toBe(2);
    });
    it("first multiple shuffle works ", function () {
        var expected = app_1.default(105, 2);
        var board = [{ name: 'passenger101', location: 'Abuja' },
            { name: 'passenger102', location: 'Benue' },
            { name: 'passenger103', location: 'Kastina' },
            { name: 'passenger104', location: 'Lagos' },
            { name: 'passenger105', location: 'Sambisa' }];
        expect(expected.boarded).toStrictEqual(board);
        expect(expected.count).toBe(3);
    });
    it("second multiple shuffle works ", function () {
        var expected = app_1.default(155, 3);
        var board = [{ name: 'passenger151', location: 'Abuja' },
            { name: 'passenger152', location: 'Benue' },
            { name: 'passenger153', location: 'Kastina' },
            { name: 'passenger154', location: 'Lagos' },
            { name: 'passenger155', location: 'Sambisa' }];
        expect(expected.boarded).toStrictEqual(board);
        expect(expected.count).toBe(4);
    });
    it("third multiple shuffle works ", function () {
        var expected = app_1.default(205, 4);
        var board = [{ name: 'passenger201', location: 'Abuja' },
            { name: 'passenger202', location: 'Benue' },
            { name: 'passenger203', location: 'Kastina' },
            { name: 'passenger204', location: 'Lagos' },
            { name: 'passenger205', location: 'Sambisa' }];
        expect(expected.boarded).toStrictEqual(board);
        expect(expected.count).toBe(5);
    });
});
describe("test for boarded value with passengers of 50 and shuffle 0", function () {
    var passengers = 50;
    var shuffle = 0;
    var expected = app_1.default(passengers, shuffle);
    expect(expected.boarded).toStrictEqual(mock_1.prefilled);
});
