const taskOne = (passengers:number, shuffle:number)=>{

    // Constants
    const passengersPerTrip = 50;
    const minBoarders = 5;
    
    // Data definition
    interface Passenger {
        name: string,
        location: string
    }

    type Location = ["Abuja", "Benue", "Kastina", "Lagos", "Sambisa"];

    /**
     * 
     * @param passengers 
     * @param shuffle 
     * @returns - The number of trips 
     */

    const countTrip = (passengers: number, shuffle:number): number => {
        let tripCount = 0;
        let count = 1;
        let isTrue;

        /* Ascertains if there are passengers in excess of 50 or its multiples
         and the excess are also greater than or equal to the minimum boarding amount */ 
        if (passengers > passengersPerTrip) {
            const extraPassengers = passengers % passengersPerTrip;
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
            } else {
                tripCount++;
            }
            
            if (isTrue) {
                tripCount++;
            }
        /* Ascertain if there are more than 50 passengers and the excess of 50 is more than
            than the minimum amount of boarders
        */
        } else if (passengers > passengersPerTrip && isTrue) {
            // Add one to tripCount if the excess of passengersPerTrip is more than 5
            if (shuffle) {
                tripCount = Math.floor(passengers / passengersPerTrip) + 1;
            } else {
                tripCount = Math.floor(passengers / passengersPerTrip);
            }
        // Ascertain if there are less than 50 passengers
        } else if (passengers < passengersPerTrip) {
            // Recompute isTrue as passengers are less than 50
            const isTrue = Math.floor(passengers / minBoarders) >= 1;

            if (isTrue) {
                tripCount++;
            }
        } 

        return tripCount;
    }

    /**
     * 
     * @param passengers 
     * @param shuffle
     * @returns - The last set of passengers onboard
     */
    const boardPassengers = (passengers: number, shuffle:number): Passenger[] => {
        const boarded: Passenger[] = [];
        const locations: Location = ["Abuja", "Benue", "Kastina", "Lagos", "Sambisa"];
        const excessPassengers = passengers % passengersPerTrip;
        const isExcessMoreThan5 = Math.floor(excessPassengers / minBoarders) >= 1;
        let locCount = 0;

        // Board passengers less than or equal to 50 if shuffle is 0 
        if (!shuffle) {
            if (passengers >= passengersPerTrip) {
                for (let passenger = 1; passenger <= passengersPerTrip; passenger++) {
                    boarded.push({
                        name: `passenger${passenger}`,
                        location: locations[locCount]
                    });
                    locCount++
                    locCount = locCount % minBoarders === 0 ? 0 : locCount;
                }

                return boarded;

            } else if (passengers >= minBoarders && passengers < passengersPerTrip)  {
                let numOfPassengers = Math.floor(passengers / minBoarders);

                for (let passenger = 1; passenger <= numOfPassengers; passenger++) {
                    boarded.push({
                        name: `passenger${passenger}`,
                        location: locations[locCount]
                    });
                    locCount++
                    locCount = locCount % minBoarders === 0 ? 0 : locCount;
                }

                return boarded;

            }

        }

        // Determine the amount of passengers to populate in the boarded list when 
        // shuffle is more than 0 and passengers is a multiple of 50
        if (passengers > passengersPerTrip && passengers % passengersPerTrip === 0) {
            const val = passengers / passengersPerTrip;
            const firstPassenger = (passengersPerTrip * (val - 1)) + 1;
            const passengerToOnBoard = passengers - (passengersPerTrip * val); 
            const passengerLimit = minBoarders * Math.floor(passengerToOnBoard / minBoarders); 
            const limit = (passengersPerTrip * val) + passengerLimit;

            for (let passenger = firstPassenger; passenger <= limit; passenger++) {
                boarded.push({
                    name: `passenger${passenger}`,
                    location: locations[locCount]
                });
                locCount++
                locCount = locCount % minBoarders === 0 ? 0 : locCount;
            }
        // When shuffle is more than 0 and excess passengers are a multiple of 5
        } else if (passengers > passengersPerTrip && isExcessMoreThan5) {
            const val = Math.floor(passengers / passengersPerTrip);
            const firstPassenger = (passengersPerTrip * val) + 1;
            const passengerToOnBoard = passengers - (passengersPerTrip * val); 
            const passengerLimit = minBoarders * Math.floor(passengerToOnBoard / minBoarders); 
            const limit = (passengersPerTrip * val) + passengerLimit;

            for (let passenger = firstPassenger; passenger <= limit; passenger++) {
                boarded.push({
                    name: `passenger${passenger}`,
                    location: locations[locCount]
                });
                locCount++;
                locCount = locCount % minBoarders === 0 ? 0 : locCount;
            }
        // When shuffle is more than 0 and excess passengers are less than 5
        // or passengers are 50 and above
        } else if (excessPassengers < minBoarders || passengers >= passengersPerTrip) {
            const val = Math.floor(passengers / passengersPerTrip);
            const firstPassenger = (passengersPerTrip * (val - 1)) + 1;
            const passengerToOnBoard = passengers - (passengersPerTrip * val); 
            const passengerLimit = minBoarders * Math.floor(passengerToOnBoard / minBoarders); 
            const limit = (passengersPerTrip * val) + passengerLimit;

            for (let passenger = firstPassenger; passenger <= limit; passenger++) {
                boarded.push({
                    name: `passenger${passenger}`,
                    location: locations[locCount]
                });
                locCount++;
                locCount = locCount % minBoarders === 0 ? 0 : locCount;
            }
        // When shuffle is more than 0 and passengers are less than 50
        } else {
            if (passengers < passengersPerTrip) {
                const boarders = Math.floor(passengers / minBoarders);
                const numOfPassengers = boarders * minBoarders;
                
                for (let passenger = 1; passenger <= numOfPassengers; passenger++) {
                    boarded.push({
                        name: `passenger${passenger}`,
                        location: locations[locCount]
                    });
                    locCount++;
                    locCount = locCount % minBoarders === 0 ? 0 : locCount;
                }
            }
        }

        return boarded;
    }

    /**
     * 
     * @param passengers 
     * @returns - The passengers on the reservation list 
     */
    const populateReserve = (passengers: number): Passenger[] => {
        const reservation: Passenger[] = [];
        const locations: Location = ["Abuja", "Benue", "Kastina", "Lagos", "Sambisa"];
        let locCount = 0;

        if (passengers % minBoarders !== 0) {
            const val = Math.floor(passengers / minBoarders);
            const firstPassenger = (minBoarders * val) + 1;

            for (let passenger = firstPassenger; passenger <= passengers; passenger++) {
                reservation.push({
                    name: `passenger${passenger}`,
                    location: locations[locCount]
                });
                locCount++;
            }
        }

        return reservation;
    }


    return {
        // Board passengers only when they are more than 5
        boarded: passengers < minBoarders ? [] : boardPassengers(passengers, shuffle),
        reservation: populateReserve(passengers),
        count: countTrip(passengers, shuffle)
    }; 
}

export default taskOne;