"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var taskOne = function (passengers, shuffle) {
    // Constants
    var passengersPerTrip = 50;
    var minBoarders = 5;
    /**
     *
     * @param passengers
     * @param shuffle
     * @returns - The number of trips
     */
    var countTrip = function (passengers, shuffle) {
        var tripCount = 0;
        var count = 1;
        var isTrue;
        /* Ascertains if there are passengers in excess of 50 or its multiples
         and the excess are also greater than or equal to the minimum boarding amount */
        if (passengers > passengersPerTrip) {
            var extraPassengers = passengers % passengersPerTrip;
            if (extraPassengers) {
                isTrue = Math.floor(extraPassengers / minBoarders) >= 1;
            }
        }
        /* Ascertains if passengers are more than or equal to 50 and they're a
            multiple of 50
        */
        if (passengers >= passengersPerTrip && passengers % passengersPerTrip === 0) {
            if (shuffle) {
                while (shuffle && (passengersPerTrip * count) < passengers) {
                    tripCount++;
                    count++;
                    shuffle--;
                }
            }
            else {
                tripCount++;
            }
            if (isTrue) {
                tripCount++;
            }
            /* Ascertain if there are more than 50 passengers and the excess of 50 is more than
                than the minimum amount of boarders
            */
        }
        else if (passengers > passengersPerTrip && isTrue) {
            // Add one to tripCount if the excess of passengersPerTrip is more than 5
            if (shuffle) {
                tripCount = Math.floor(passengers / passengersPerTrip) + 1;
            }
            else {
                tripCount = Math.floor(passengers / passengersPerTrip);
            }
            // Ascertain if there are less than 50 passengers
        }
        else if (passengers < passengersPerTrip) {
            // Recompute isTrue as passengers are less than 50
            var isTrue_1 = Math.floor(passengers / minBoarders) >= 1;
            if (isTrue_1) {
                tripCount++;
            }
        }
        return tripCount;
    };
    /**
     *
     * @param passengers
     * @param shuffle
     * @returns - The last set of passengers onboard
     */
    var boardPassengers = function (passengers, shuffle) {
        var boarded = [];
        var locations = ["Abuja", "Benue", "Kastina", "Lagos", "Sambisa"];
        var excessPassengers = passengers % passengersPerTrip;
        var isExcessMoreThan5 = Math.floor(excessPassengers / minBoarders) >= 1;
        var locCount = 0;
        // Board less than or equal to 50 passengers if shuffle is 0 
        if (!shuffle) {
            if (passengers >= passengersPerTrip) {
                for (var passenger = 1; passenger <= passengersPerTrip; passenger++) {
                    boarded.push({
                        name: "passenger" + passenger,
                        location: locations[locCount]
                    });
                    locCount++;
                    locCount = locCount % minBoarders === 0 ? 0 : locCount;
                }
                return boarded;
            }
            else if (passengers >= minBoarders && passengers < passengersPerTrip) {
                var numOfPassengers = Math.floor(passengers / minBoarders);
                for (var passenger = 1; passenger <= numOfPassengers; passenger++) {
                    boarded.push({
                        name: "passenger" + passenger,
                        location: locations[locCount]
                    });
                    locCount++;
                    locCount = locCount % minBoarders === 0 ? 0 : locCount;
                }
                return boarded;
            }
        }
        // Determine the amount of passengers to populate in the boarded list when 
        // shuffle is more than 0 and passengers is a multiple of 50
        if (passengers > passengersPerTrip && passengers % passengersPerTrip === 0) {
            var val = passengers / passengersPerTrip;
            var firstPassenger = (passengersPerTrip * (val - 1)) + 1;
            var passengerToOnBoard = passengers - (passengersPerTrip * val);
            var passengerLimit = minBoarders * Math.floor(passengerToOnBoard / minBoarders);
            var limit = (passengersPerTrip * val) + passengerLimit;
            for (var passenger = firstPassenger; passenger <= limit; passenger++) {
                boarded.push({
                    name: "passenger" + passenger,
                    location: locations[locCount]
                });
                locCount++;
                locCount = locCount % minBoarders === 0 ? 0 : locCount;
            }
            // When shuffle is more than 0 and excess passengers are a multiple of 5
        }
        else if (passengers > passengersPerTrip && isExcessMoreThan5) {
            var val = Math.floor(passengers / passengersPerTrip);
            var firstPassenger = (passengersPerTrip * val) + 1;
            var passengerToOnBoard = passengers - (passengersPerTrip * val);
            var passengerLimit = minBoarders * Math.floor(passengerToOnBoard / minBoarders);
            var limit = (passengersPerTrip * val) + passengerLimit;
            for (var passenger = firstPassenger; passenger <= limit; passenger++) {
                boarded.push({
                    name: "passenger" + passenger,
                    location: locations[locCount]
                });
                locCount++;
                locCount = locCount % minBoarders === 0 ? 0 : locCount;
            }
            // When shuffle is more than 0 and excess passengers are less than 5
            // or passengers are 50 and above
        }
        else if (excessPassengers < minBoarders || passengers >= passengersPerTrip) {
            var val = Math.floor(passengers / passengersPerTrip);
            var firstPassenger = (passengersPerTrip * (val - 1)) + 1;
            var passengerToOnBoard = passengers - (passengersPerTrip * val);
            var passengerLimit = minBoarders * Math.floor(passengerToOnBoard / minBoarders);
            var limit = (passengersPerTrip * val) + passengerLimit;
            for (var passenger = firstPassenger; passenger <= limit; passenger++) {
                boarded.push({
                    name: "passenger" + passenger,
                    location: locations[locCount]
                });
                locCount++;
                locCount = locCount % minBoarders === 0 ? 0 : locCount;
            }
            // When shuffle is more than 0 and passengers are less than 50
        }
        else {
            if (passengers < passengersPerTrip) {
                var boarders = Math.floor(passengers / minBoarders);
                var numOfPassengers = boarders * minBoarders;
                for (var passenger = 1; passenger <= numOfPassengers; passenger++) {
                    boarded.push({
                        name: "passenger" + passenger,
                        location: locations[locCount]
                    });
                    locCount++;
                    locCount = locCount % minBoarders === 0 ? 0 : locCount;
                }
            }
        }
        return boarded;
    };
    /**
     *
     * @param passengers
     * @returns - The passengers on the reservation list
     */
    var populateReserve = function (passengers) {
        var reservation = [];
        var locations = ["Abuja", "Benue", "Kastina", "Lagos", "Sambisa"];
        var locCount = 0;
        if (passengers % minBoarders !== 0) {
            var val = Math.floor(passengers / minBoarders);
            var firstPassenger = (minBoarders * val) + 1;
            for (var passenger = firstPassenger; passenger <= passengers; passenger++) {
                reservation.push({
                    name: "passenger" + passenger,
                    location: locations[locCount]
                });
                locCount++;
            }
        }
        return reservation;
    };
    return {
        // Board passengers only when they are more than 5
        boarded: passengers < minBoarders ? [] : boardPassengers(passengers, shuffle),
        reservation: populateReserve(passengers),
        count: countTrip(passengers, shuffle)
    };
};
exports.default = taskOne;
