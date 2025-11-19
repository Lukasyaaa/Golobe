import { useMemo } from "react";
import { AIRLINES, FLIGHTS_SORT_TYPE, getFlyDuration, getPrice, NAVBAR_DESCRIPTION, NAVBAR_ITEM, SITE_PARTS, timeToInt, TRIP_TYPE, type Flight, type Hotel, type NavbarFilter, type NavbarRangeValue, type objType } from "../types";
import type { NavbarFilterState } from "../pages/Catalog";

export const useFlight = (
    massive: Flight[], navbarFiltersState: NavbarFilterState[], 
    navbarFilters: NavbarFilter[], activeCategory: objType<typeof FLIGHTS_SORT_TYPE>,
    contentType: objType<typeof SITE_PARTS>,
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
        navbarFilters.forEach(({type, description, value}) => {
            if(type === NAVBAR_ITEM.radios){
                if(description === NAVBAR_DESCRIPTION.rating){
                    ratingMassive = [...value];
                }
            } else if(type === NAVBAR_ITEM.checkboxes){
                if(description === NAVBAR_DESCRIPTION.airlines){
                    airlinesMassive = [...(value as objType<typeof AIRLINES>[])];
                } else if(description === NAVBAR_DESCRIPTION.trips){
                    tripsMassive = [...(value as objType<typeof TRIP_TYPE>[])]
                }
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
                        const fromToAirlines = [item.schedule.from.airline, item.schedule.to.airline];
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
                        for(const schedulePart of [item.schedule.from, item.schedule.to]){
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
        const filtredMassive = [...futureMassive];

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

        const theCheapest = filtredMassive.length
            ? filtredMassive.reduce((min, f) => getPrice(f) < getPrice(min) ? f : min)
            : null;

        const theBest = filtredMassive.length
            ? filtredMassive.reduce((max, f) => f.rating > max.rating ? f : max)
            : null;

        const theQuickest = filtredMassive.length
            ? filtredMassive.reduce((min, f) => {
                const first = getFlyDuration(f, currentAirlines, airlinesMassive);
                const second = getFlyDuration(min, currentAirlines, airlinesMassive);
                return first < second ? f : min;
            })
            : null;

        return { theCheapest, theBest, theQuickest, airlinesMassive, airlineState: currentAirlines, filtredMassive };
    }, [navbarFiltersState, massive]);
}