import { useMemo } from "react";
import { AIRLINES, FLIGHTS_CHOOSE_TYPE, getFlyDuration, getPrice, NAVBAR_DESCRIPTION, SEATS_TYPE, SITE_PARTS, timeToInt, TRIP_TYPE} from "../types";
import type { Flight, NavbarRangeValue, objType, User, FetchedAirporstValue } from "../types.ts";
import type { FetchedState, NavbarFilterAbout, NavbarFilterState } from "../pages/Catalog";

const getIsHaveSeats = (
    seatsType: objType<typeof SEATS_TYPE>, countSeats: number, flight: Flight, tripType: string
) => {
    const users = JSON.parse(localStorage.getItem("users") as string) as User[];
    const field = (seatsType === SEATS_TYPE.business) 
        ? "business" : (seatsType === SEATS_TYPE.economy) ? "economy" : "first"
    const usedSeats = 
        users.flatMap(u => u.tickets)
        .filter(t => t.id === flight.id)
        .filter(t => t.seatType === seatsType)
        .map(t => t.seatNumber)
    ;
    if(flight.type === TRIP_TYPE.onWay){
        return flight.schedule.seats[field].count - usedSeats.length >= countSeats;
    } else if(flight.type === TRIP_TYPE.multiCity){
        return flight.schedule.parts.every(sp => sp.seats[field].count - usedSeats.length >= countSeats);
    } else{
        if(tripType === "Depart"){
            return flight.schedule.from.seats[field].count - usedSeats.length >= countSeats;
        } else if(tripType === "Return"){
            return flight.schedule.to.seats[field].count - usedSeats.length >= countSeats;
        } else {
            return(
                flight.schedule.from.seats[field].count - usedSeats.length >= countSeats &&
                flight.schedule.to.seats[field].count - usedSeats.length >= countSeats
            );
        }
    }
}

export const useFlight = (
    massive: Flight[], navbarFiltersState: NavbarFilterState[], 
    navbarFilters: NavbarFilterAbout[], activeCategory: objType<typeof FLIGHTS_CHOOSE_TYPE>,
    contentType: objType<typeof SITE_PARTS>, airports: (FetchedState<FetchedAirporstValue> | null)[],
    fromTo: string | undefined, passengersClass: string | undefined, departReturn: string | undefined, 
    tripType: string, cityOrCountry: string | undefined, location: string
) => {
    return useMemo(() => {
        if (contentType === SITE_PARTS.stays || navbarFiltersState.length === 0 || airports.includes(null)) {
            return {
                theCheapest: null, theBest: null, theQuickest: null,
                airlinesMassive: [], airlineState: [], filtredMassive: []
            };
        }

        let ratingMassive: string[] = [];
        let airlinesMassive: objType<typeof AIRLINES>[] = [];
        navbarFilters.forEach(({description, value}) => {
            if(description === NAVBAR_DESCRIPTION.rating){
                ratingMassive = [...value];
            } else if(description === NAVBAR_DESCRIPTION.airlines){
                airlinesMassive = [...(value as objType<typeof AIRLINES>[])];
            }
        });
        let currentRating : number = 0;
        let currentAirlines : number[] = [];
        let currentPrice : NavbarRangeValue<number> = {from: 0, to: 0};
        let currentTime : NavbarRangeValue<number> = {from: -1, to: -1};
        navbarFiltersState.forEach(({description, value}) => {
            switch(description){
                case NAVBAR_DESCRIPTION.rating:
                    currentRating = value as number;
                    break;
                case NAVBAR_DESCRIPTION.airlines:
                    currentAirlines = value as number[];
                    break;
                case NAVBAR_DESCRIPTION.price:
                    currentPrice = value as NavbarRangeValue<number>;
                    break;
                case NAVBAR_DESCRIPTION.time:
                    currentTime = value as NavbarRangeValue<number>;
                    break;
            }
        })

        let futureMassive : Flight[] = []
        massive.forEach(f => {
            if(ratingMassive.length !== 0){
                if(f.rating < parseFloat(ratingMassive[currentRating])){
                    return;
                }
            }
            if(currentPrice.from !== -1 && currentPrice.to !== -1){
                const checkedPrice = getPrice(f);
                if(checkedPrice < currentPrice.from || checkedPrice > currentPrice.to) return;
            }

            let copyTripType = tripType.split("+").map(t => {
                if(t === "Round-Trip" || t === "Depart" || t === "Return") return TRIP_TYPE.roundTrip;
                if(t === "On-Way") return TRIP_TYPE.onWay;
                return t;
            })
            if(!copyTripType.includes(f.type))
                return;

            if(passengersClass !== undefined){
                let [passengers, flightClass] = passengersClass.split("+");
                const passengersCount = parseInt(passengers.split("-")[0]);
                flightClass = flightClass.replace("-", " ");
                if(!getIsHaveSeats(flightClass as objType<typeof SEATS_TYPE>, passengersCount, f, tripType)){
                    return;
                }
            }

            if(departReturn !== undefined){
                const [neededDepart, neededArrival] = departReturn.split("+");
                const [departDay, departMonth, departYear] = neededDepart.split("-");
                const [arrivalDay, arrivalMonth, arrivalYear] = neededArrival.split("-");
                const neededDepartDate = new Date(2000 + parseInt(departYear), parseInt(departMonth) - 1, parseInt(departDay));
                const neededArrivalDate = new Date(2000 + parseInt(arrivalYear), parseInt(arrivalMonth) - 1, parseInt(arrivalDay), 23, 59, 59, 999);
                
                let checkedDates: Date[] = [];
                if(f.type === TRIP_TYPE.roundTrip){
                    if(tripType.split("+").includes("Depart")){
                        const {departTime, arrayTime} = f.schedule.from;
                        checkedDates.push(
                            new Date(departTime.year, departTime.month - 1, departTime.day),
                            new Date(arrayTime.year, arrayTime.month - 1, arrayTime.day, 23, 59),
                        )
                    } else if(tripType.split("+").includes("Return")){
                        const {departTime, arrayTime} = f.schedule.to;
                        checkedDates.push(
                            new Date(departTime.year, departTime.month - 1, departTime.day),
                            new Date(arrayTime.year, arrayTime.month - 1, arrayTime.day, 23, 59),
                        )
                    } else if(tripType.split("+").includes("Round-Trip")){
                        const {departTime: fromDepartTime, arrayTime: fromArrayTime} = f.schedule.from;
                        const {departTime: toDepartTime, arrayTime: toArrayTime} = f.schedule.to;
                        checkedDates.push(
                            new Date(fromDepartTime.year, fromDepartTime.month - 1, fromDepartTime.day),
                            new Date(fromArrayTime.year, fromArrayTime.month - 1, fromArrayTime.day, 23, 59),
                            new Date(toDepartTime.year, toDepartTime.month - 1, toDepartTime.day),
                            new Date(toArrayTime.year, toArrayTime.month - 1, toArrayTime.day, 23, 59),
                        )
                    }
                } else if(f.type === TRIP_TYPE.onWay) {
                    const {departTime, arrayTime} = f.schedule;
                    checkedDates.push(
                        new Date(departTime.year, departTime.month - 1, departTime.day),
                        new Date(arrayTime.year, arrayTime.month - 1, arrayTime.day, 23, 59)
                    )
                } else{
                    const {year: fdYear, month: fdMonth, day: fdDay} = f.schedule.parts[0].departTime; 
                    const {year: faYear, month: faMonth, day: faDay} = f.schedule.parts[0].arrayTime;
                    const {year: edYear, month: edMonth, day: edDay} = f.schedule.parts[f.schedule.parts.length - 1].departTime;
                    const {year: eaYear, month: eaMonth, day: eaDay} = f.schedule.parts[f.schedule.parts.length - 1].arrayTime;
                    checkedDates = [
                        new Date(fdYear, fdMonth - 1, fdDay), new Date(faYear, faMonth - 1, faDay, 23, 59),
                        new Date(edYear, edMonth - 1, edDay), new Date(eaYear, eaMonth - 1, eaDay, 23, 59)
                    ]
                }

                if(!checkedDates.every(date => date >= neededDepartDate && date <= neededArrivalDate)){
                    return;
                }
            }

            switch(f.type){
                case TRIP_TYPE.onWay:
                    if(
                        timeToInt(f.schedule.departTime.units, false) < currentTime.from ||
                        timeToInt(f.schedule.arrayTime.units, true) > currentTime.to
                    ) 
                        return;
                    break;
                case TRIP_TYPE.multiCity:
                    if(!f.schedule.parts.every(schedulePart => 
                        timeToInt(schedulePart.departTime.units, false) >= currentTime.from &&
                        timeToInt(schedulePart.arrayTime.units, true) <= currentTime.to
                    )) 
                        return;
                    break;
                case TRIP_TYPE.roundTrip:
                    const fromToScheduleParts = (tripType === "Depart") 
                        ? [f.schedule.from]
                        : (tripType === "Return") 
                            ? [f.schedule.to] : [f.schedule.from, f.schedule.to]
                    ;
                    if(!fromToScheduleParts.every(schedulePart => 
                        timeToInt(schedulePart.departTime.units, false) >= currentTime.from &&
                        timeToInt(schedulePart.arrayTime.units, true) <= currentTime.to
                    )) 
                        return
                    break;
            }

            if(airlinesMassive.length !== 0 && currentAirlines.length !== 0){
                switch(f.type){
                    case TRIP_TYPE.roundTrip:
                        const fromToAirlines = (tripType === "Depart") 
                            ? [f.schedule.from.airline]
                            : (tripType === "Return") 
                                ? [f.schedule.to.airline]
                                : [f.schedule.from.airline, f.schedule.to.airline]
                        ;
                        if(!currentAirlines.some(airline => fromToAirlines.includes(airlinesMassive[airline])))
                            return;
                        break;
                    case TRIP_TYPE.onWay:
                        if(!currentAirlines.some(airline => airlinesMassive[airline] === f.schedule.airline))
                            return
                        break;
                    case TRIP_TYPE.multiCity:
                        if(!currentAirlines.some(airline => f.schedule.parts.some(
                            schedulePart => schedulePart.airline === airlinesMassive[airline]
                        ))) return;
                }
            }

            if(airports.length !== 0){
                if(fromTo !== undefined){
                    const [neededFrom, neededTo] = fromTo.split("-");
                    const neededAirport = airports.find(a => (a as FetchedState<FetchedAirporstValue>).id === f.id) as FetchedState<FetchedAirporstValue>;
                    if((neededAirport.value.from.city !== neededFrom || 
                    neededAirport.value.to.city !== neededTo)){
                        return;
                    }
                } else if(cityOrCountry !== undefined){
                    const neededAirport = airports.find(a => (a as FetchedState<FetchedAirporstValue>).id === f.id) as FetchedState<FetchedAirporstValue>;
                    if(cityOrCountry.replace("-", " ") !== neededAirport.value.to.city && 
                    cityOrCountry.replace("-", " ") !== neededAirport.value.to.country) 
                        return;
                }
            }

            futureMassive.push(f);
        });
        let filtredMassive = [...futureMassive];

        const tripsTypes = String(tripType).split("+");
        let opts: string = (tripsTypes.includes("Depart") 
            ? "Depart" : (tripsTypes.includes("Return") ? "Return"  : "Round-Trip")
        );
        switch(activeCategory){
            case FLIGHTS_CHOOSE_TYPE.best:
                filtredMassive.sort((a, b) => b.rating - a.rating);
                break;
            case FLIGHTS_CHOOSE_TYPE.cheapest:
                filtredMassive.sort((a, b) => getPrice(a) - getPrice(b));
                break;
            case FLIGHTS_CHOOSE_TYPE.quickest:
                filtredMassive.sort((a, b) => getFlyDuration(a, currentAirlines, airlinesMassive, opts) - getFlyDuration(b, currentAirlines, airlinesMassive, opts));
                break;
        }

        const theCheapest = filtredMassive.length
            ? filtredMassive.reduce((min, f) => getPrice(f) < getPrice(min) ? f : min)
            : null;

        const theBest = filtredMassive.length
            ? filtredMassive.reduce(
                (max, f) => ((f.rating > max.rating) ? f : max)
            )
            : null;

        const theQuickest = filtredMassive.length
            ? filtredMassive.reduce((min, f) => {
                const first = getFlyDuration(f, currentAirlines, airlinesMassive, opts);
                const second = getFlyDuration(min, currentAirlines, airlinesMassive, opts);
                return first < second ? f : min;
            })
            : null;

        return { theCheapest, theBest, theQuickest, airlinesMassive, airlineState: currentAirlines, filtredMassive };
    }, [navbarFiltersState, massive, activeCategory, airports, location]);
}