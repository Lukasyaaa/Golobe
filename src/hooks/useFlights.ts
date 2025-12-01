import { useMemo } from "react";
import { AIRLINES, FLIGHTS_SORT_TYPE, getFlyDuration, getPrice, NAVBAR_DESCRIPTION, SEATS_TYPE, SITE_PARTS, timeToInt, TRIP_TYPE, type AirportInfo, type Flight, type Hotel, type NavbarFilter, type NavbarRangeValue, type objType, type User } from "../types";
import type { FetchedState, FetchedAirporstValue, NavbarFilterAbout, NavbarFilterState } from "../pages/Catalog";

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

interface Point{
    from: string, to: string
}
export const useFlight = (
    massive: Flight[], navbarFiltersState: NavbarFilterState[], 
    navbarFilters: NavbarFilterAbout[], activeCategory: objType<typeof FLIGHTS_SORT_TYPE>,
    contentType: objType<typeof SITE_PARTS>, airports: (FetchedState<FetchedAirporstValue> | null)[],
    fromTo: string | undefined, passengersClass: string | undefined, departReturn: string | undefined, 
    tripType: string, location: string
) => {
    return useMemo(() => {
        if (navbarFiltersState.length === 0 || contentType === SITE_PARTS.stays) {
            return {
                theCheapest: null, theBest: null, theQuickest: null,
                airlinesMassive: [], airlineState: [], filtredMassive: []
            };
        }

        let ratingMassive: string[] = [];
        let airlinesMassive: objType<typeof AIRLINES>[] = [];
        let tripsMassive: objType<typeof TRIP_TYPE>[] = [];
        navbarFilters.forEach(({description, value}) => {
            if(description === NAVBAR_DESCRIPTION.rating){
                ratingMassive = [...value];
            } else if(description === NAVBAR_DESCRIPTION.airlines){
                airlinesMassive = [...(value as objType<typeof AIRLINES>[])];
            } else if(description === NAVBAR_DESCRIPTION.trips){
                tripsMassive = [...(value as objType<typeof TRIP_TYPE>[])]
            }
        });
        let currentRating : number = 0;
        let currentAirlines : number[] = [];
        let currentTripTypes : number[] = [];
        let currentPrice : NavbarRangeValue<number> = {from: 0, to: 0};
        let currentTime : NavbarRangeValue<number> = {from: 0, to: 0};
        navbarFiltersState.forEach(({description, value}) => {
            switch(description){
                case NAVBAR_DESCRIPTION.rating:
                    currentRating = value as number;
                    break;
                case NAVBAR_DESCRIPTION.airlines:
                    currentAirlines = value as number[];
                    break;
                case NAVBAR_DESCRIPTION.trips:
                    currentTripTypes = value as number[];
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
        massive.forEach(item => {
            if(ratingMassive.length !== 0){
                if(item.rating < parseFloat(ratingMassive[currentRating])){
                    return;
                }
            }
            if(tripsMassive.length !== 0 && currentTripTypes.length !== 0){
                let isCoincidenceType = false;
                for(const tripTypeI of currentTripTypes){
                    if(tripsMassive[tripTypeI] === item.type){
                        isCoincidenceType = true;
                        break;
                    }
                }
                if(!isCoincidenceType) return;
            }
            if(airlinesMassive.length !== 0 && currentAirlines.length !== 0){
                let isCoincidenceAirlines = false;
                switch(item.type){
                    case TRIP_TYPE.roundTrip:
                        const fromToAirlines = (tripType === "Depart") 
                            ? [item.schedule.from.airline]
                            : (tripType === "Return") 
                                ? [item.schedule.to.airline]
                                : [item.schedule.from.airline, item.schedule.to.airline];
                        for(const airlineI of currentAirlines){
                            if(fromToAirlines.includes(airlinesMassive[airlineI])){
                                isCoincidenceAirlines = true;
                                break;
                            }
                        }
                        break;
                    case TRIP_TYPE.onWay:
                        for(const airlineI of currentAirlines){
                            if(item.schedule.airline === airlinesMassive[airlineI]){
                                isCoincidenceAirlines = true;
                                break;
                            }
                        }
                        break;
                    case TRIP_TYPE.multiCity:
                        for(const airlineI of currentAirlines){ 
                            for(const partItem of item.schedule.parts){
                                if(partItem.airline === airlinesMassive[airlineI]){
                                    isCoincidenceAirlines = true;
                                    break;
                                }
                            }
                        }
                }
                if(!isCoincidenceAirlines) return;
            }
            if(currentPrice.from !== -1 && currentPrice.to !== -1){
                const checkedPrice = getPrice(item);
                if(checkedPrice < currentPrice.from || checkedPrice > currentPrice.to) return;
            }
            if(currentTime.from !== -1 && currentTime.to !== -1){
                switch(item.type){
                    case TRIP_TYPE.onWay:
                        if(
                            timeToInt(item.schedule.departTime.units, false) < currentTime.from ||
                            timeToInt(item.schedule.arrayTime.units, true) > currentTime.to
                        ) return;
                        break;
                    case TRIP_TYPE.multiCity:{
                        let isSomeGood = false;
                        for(const schedulePart of item.schedule.parts){
                            if(
                                timeToInt(schedulePart.departTime.units, false) >= currentTime.from &&
                                timeToInt(schedulePart.arrayTime.units, true) <= currentTime.to
                            ){
                                isSomeGood = true;
                                break;
                            };
                        }
                        if(!isSomeGood) return;
                        break;
                    }case TRIP_TYPE.roundTrip:
                        let isSomeGood = false;
                        for(const schedulePart of (tripType === "Depart") 
                            ? [item.schedule.from]
                            : (tripType === "Return") 
                                ? [item.schedule.to]
                                : [item.schedule.from, item.schedule.to]){
                            if(
                                timeToInt(schedulePart.departTime.units, false) >= currentTime.from &&
                                timeToInt(schedulePart.arrayTime.units, true) <= currentTime.to
                            ){
                                isSomeGood = true;
                                break;
                            };
                        }
                        if(!isSomeGood) return;
                        break;
                }
            }
            futureMassive.push(item);
        });
        let filtredMassive = [...futureMassive];

        switch(activeCategory){
            case FLIGHTS_SORT_TYPE.best:
                filtredMassive.sort((a, b) => b.rating - a.rating);
                break;
            case FLIGHTS_SORT_TYPE.cheapest:
                filtredMassive.sort((a, b) => getPrice(a) - getPrice(b));
                break;
            case FLIGHTS_SORT_TYPE.quickest:
                filtredMassive.sort((a, b) => getFlyDuration(a, currentAirlines, airlinesMassive) - getFlyDuration(b, currentAirlines, airlinesMassive));
                break;
        }

        if(!airports.includes(null) && airports.length !== 0){
            let futureFiltredMassive: Flight[] = [];
            filtredMassive.forEach(f => {
                let copyTripType = tripType.split("+").map(t => {
                    if(t === "Round-Trip" || t === "Depart" || t === "Return") return TRIP_TYPE.roundTrip;
                    if(t === "On-Way") return TRIP_TYPE.onWay;
                    return t;
                })
                if(!copyTripType.includes(f.type))
                    return;

                if(fromTo !== undefined){
                    const [neededFrom, neededTo] = fromTo.split("-");
                    if(neededFrom !== undefined){
                        const neededAirport = airports.find(a => (a as FetchedState<FetchedAirporstValue>).id === f.id) as FetchedState<FetchedAirporstValue>;
                        if(tripType.split("+").includes("Return")){
                            if((neededAirport.value.from.city !== neededTo || 
                            neededAirport.value.to.city !== neededFrom)){
                                return;
                            }
                        }
                        if((neededAirport.value.from.city !== neededFrom || 
                        neededAirport.value.to.city !== neededTo)){
                            return;
                        }
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
                            checkedDates.push(
                                new Date(f.schedule.from.departTime.year, f.schedule.from.departTime.month - 1, f.schedule.from.departTime.day),
                                new Date(f.schedule.from.arrayTime.year, f.schedule.from.arrayTime.month - 1, f.schedule.from.arrayTime.day),
                            )
                        } else if(tripType.split("+").includes("Return")){
                            checkedDates.push(
                                new Date(f.schedule.to.departTime.year, f.schedule.to.departTime.month - 1, f.schedule.to.departTime.day),
                                new Date(f.schedule.to.arrayTime.year, f.schedule.to.arrayTime.month - 1, f.schedule.to.arrayTime.day),
                            )
                        } else if(tripType.split("+").includes("Round-Trip")){
                            checkedDates.push(
                                new Date(f.schedule.from.departTime.year, f.schedule.from.departTime.month - 1, f.schedule.from.departTime.day),
                                new Date(f.schedule.from.arrayTime.year, f.schedule.from.arrayTime.month - 1, f.schedule.from.arrayTime.day),
                                new Date(f.schedule.to.departTime.year, f.schedule.to.departTime.month - 1, f.schedule.to.departTime.day),
                                new Date(f.schedule.to.arrayTime.year, f.schedule.to.arrayTime.month - 1, f.schedule.to.arrayTime.day),
                            )
                        }
                    } else if(f.type === TRIP_TYPE.onWay) {
                        checkedDates.push(
                            new Date(f.schedule.departTime.year, f.schedule.departTime.month - 1, f.schedule.departTime.day),
                            new Date(f.schedule.arrayTime.year, f.schedule.arrayTime.month - 1, f.schedule.arrayTime.day)
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

                if(passengersClass !== undefined){
                    let [passengers, flightClass] = passengersClass.split("+");
                    const passengersCount = parseInt(passengers.split("-")[0]);
                    flightClass = flightClass.replace("-", " ");
                    if(!getIsHaveSeats(flightClass as objType<typeof SEATS_TYPE>, passengersCount, f, tripType)){
                        return;
                    }
                }

                futureFiltredMassive.push(f);
            })
            filtredMassive = [...futureFiltredMassive];
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
                const first = getFlyDuration(f, currentAirlines, airlinesMassive);
                const second = getFlyDuration(min, currentAirlines, airlinesMassive);
                return first < second ? f : min;
            })
            : null;

        return { theCheapest, theBest, theQuickest, airlinesMassive, airlineState: currentAirlines, filtredMassive };
    }, [navbarFiltersState, massive, activeCategory, airports, location]);
}