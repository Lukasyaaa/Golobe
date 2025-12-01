import { useEffect, useMemo } from "react";
import { AMENITIES, FREEBIES, HOTEL_TYPE, HOTELS_SORT_TYPE, NAVBAR_DESCRIPTION, SITE_PARTS, transformPrice, type Flight, type Hotel, type NavbarFilter, type NavbarRangeValue, type objType, type User } from "../types";
import type { FetchedState, NavbarFilterAbout, NavbarFilterState } from "../pages/Catalog";

const guestsInRoomCombinations = (guests: number, rooms: number) => {
    const result: number[][] = [];

    const dfs = (guestsLeft: number, roomsLeft: number, minVal: number, current: number[]) => {
        if (guestsLeft === 0 && roomsLeft === 0) {
            result.push([...current]); return;
        }
        if (guestsLeft <= 0 || roomsLeft <= 0) return;

        for (let x = minVal; x <= guestsLeft - (roomsLeft - 1); x++) {
            dfs(guestsLeft - x, roomsLeft - 1, x, [...current, x]);
        }
    }

    dfs(guests, rooms, 1, []);
    return result;
}

export const useHotels = (
    massive: Hotel[], navbarFiltersState: NavbarFilterState[], navbarFilters: NavbarFilterAbout[], 
    activeCategory: objType<typeof HOTELS_SORT_TYPE>, 
    contentType: objType<typeof SITE_PARTS>, cities: (FetchedState<string> | null)[],
    city: string | undefined, checkInCheckOut: string | undefined, roomsGuests: string,
    location: string
) => {
    return useMemo(() => {
        const users = JSON.parse(localStorage.getItem("users") as string) as User[];
        if(contentType === SITE_PARTS.flights){
            return { hotelsCount: -1, motelsCount: -1, resortsCount: -1, filtredMassive: [] }
        }
        let filtredMassive = [...massive];

        let ratingMassive: string[] = [];
        let freebiesMassive: objType<typeof FREEBIES>[] = [];
        let amenitiesMassive: objType<typeof AMENITIES>[] = [];
        navbarFilters.forEach(({description, value}) => {
            if(description === NAVBAR_DESCRIPTION.rating){
                ratingMassive = [...value];
            } else if(description === NAVBAR_DESCRIPTION.freebies){
                freebiesMassive = [...value as objType<typeof FREEBIES>[]];
            } else if(description === NAVBAR_DESCRIPTION.amenities){
                amenitiesMassive = [...value as objType<typeof AMENITIES>[]];
            }
        });

        let currentRating : number = 0;
        let currentFreebies : number[] = [];
        let currentAmenities : number[] = [];
        let currentPrice : NavbarRangeValue<number> = {from: 0, to: 0};
        navbarFiltersState.forEach(({description, value}) => {
            switch(description){
                case NAVBAR_DESCRIPTION.rating:
                    currentRating = value as number;
                    break;
                case NAVBAR_DESCRIPTION.freebies:
                    currentFreebies = value as number[];
                    break;
                case NAVBAR_DESCRIPTION.amenities:
                    currentAmenities = value as number[];
                    break;
                case NAVBAR_DESCRIPTION.price:
                    currentPrice = value as NavbarRangeValue<number>;
                    break;
            }
        })

        let futureMassive: Hotel[] = [];
        massive.forEach(item => {
            if(ratingMassive.length !== 0){
                if(item.rating < parseFloat(ratingMassive[currentRating])){
                    return;
                }
            }
            if(freebiesMassive.length !== 0 && currentFreebies.length !== 0){
                let isHaveFreebie = false;
                for(const freebieI of currentFreebies){
                    if(item.amenities.items.includes(freebiesMassive[freebieI])){
                        isHaveFreebie = true;
                        break;
                    }
                }
                if(!isHaveFreebie) return;
            }
            if(amenitiesMassive.length !== 0 && currentAmenities.length !== 0){
                let isHaveAmenitie = false;
                for(const amenitiesI of currentAmenities){
                    if(item.amenities.items.includes(amenitiesMassive[amenitiesI])){
                        isHaveAmenitie = true;
                        break;
                    }
                }
                if(!isHaveAmenitie) return;
            }
            if(currentPrice.from !== -1 && currentPrice.to !== -1){
                const checkedPrice = Math.min(...item.rooms.map(room => transformPrice(room.price)));
                if(checkedPrice < currentPrice.from || checkedPrice > currentPrice.to) return;
            }
            futureMassive.push(item);
        });
        filtredMassive = [...futureMassive];

        if(!cities.includes(null) && cities.length !== 0){
            let futureFiltredMassive: Hotel[] = [];
            filtredMassive.forEach(h => {
                if(city !== undefined){
                    const neededCity = cities.find(c => (c as FetchedState<string>).id === h.id) as FetchedState<string>;
                    const inputedCity = city.split(", ")[0];
                    if(inputedCity !== neededCity.value) return;
                }
                
                if(checkInCheckOut !== undefined){
                    const [checkInStr, ] = checkInCheckOut.split("+");
                    const [checkInMonth, checkInDay] = checkInStr.split("-");
                    const today = new Date();
                    const checkInDate = new Date(today.getFullYear(), parseInt(checkInMonth) - 1, parseInt(checkInDay));
                    if(users.some(u => u.bookings.map(({checkOutDate: bCheckOut}) => {
                        const bCheckOutDate = new Date(bCheckOut.year, bCheckOut.month - 1, bCheckOut.day);
                        return checkInDate >= bCheckOutDate
                    }).includes(false))){
                        return;
                    }
                }

                const [rooms,] = roomsGuests.split("+")[0].split("-");
                const [guests, ] = roomsGuests.split("+")[1].split("-");
                const roomsCount = parseInt(rooms); const guestsCount = parseInt(guests);
                const combinations = guestsInRoomCombinations(guestsCount, roomsCount).map(rooms => rooms.reverse());
                const roomsBeds = h.rooms.map(r => r.beds.double * 2 + r.beds.twin).sort((a, b) => a - b).slice(0, roomsCount);
                if(!combinations.some(c => c.every((cP, i) => cP <= roomsBeds[i]))){
                    return;
                }

                futureFiltredMassive.push(h);
            });
            filtredMassive = [...futureFiltredMassive];
        }

        const hotelsCount = filtredMassive.filter(h => h.type === HOTEL_TYPE.hotels).length;
        const motelsCount = filtredMassive.filter(h => h.type === HOTEL_TYPE.motels).length;
        const resortsCount = filtredMassive.filter(h => h.type === HOTEL_TYPE.resorts).length;

        filtredMassive = [...filtredMassive].filter(hotel => hotel.type === activeCategory);

        return { hotelsCount, motelsCount, resortsCount, filtredMassive };
    }, [navbarFiltersState, activeCategory, massive, cities, location]);
}