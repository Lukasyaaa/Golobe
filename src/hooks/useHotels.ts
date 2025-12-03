import { useMemo } from "react";
import { AMENITIES, FREEBIES, HOTEL_TYPE, HOTELS_CHOOSE_TYPE, NAVBAR_DESCRIPTION, SITE_PARTS, transformPrice, type Flight, type Hotel, type HotelReview, type NavbarFilter, type NavbarRangeValue, type objType, type ShortLocation, type User } from "../types";
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
    activeCategory: objType<typeof HOTELS_CHOOSE_TYPE>, 
    contentType: objType<typeof SITE_PARTS>, cities: (FetchedState<ShortLocation> | null)[],
    destination: string | undefined, checkInCheckOut: string | undefined, roomsGuests: string,
    cityOrCountry: string | undefined, location: string
) => {
    return useMemo(() => {
        const users = JSON.parse(localStorage.getItem("users") as string) as User[];
        if(contentType === SITE_PARTS.flights || navbarFiltersState.length === 0 || cities.includes(null)){
            return { hotelsCount: 0, motelsCount: 0, resortsCount: 0, filtredMassive: [] }
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
        massive.forEach(h => {
            if(ratingMassive.length !== 0){
                const hotelsReviews = JSON.parse(localStorage.getItem("hotelsReviews") || "[]") as HotelReview[];
                const currentHotelReviews = hotelsReviews.filter(r => r.hotelId === Number(h.id));
                let realGrade : number = 0;
                if(currentHotelReviews.length !== 0){
                    const grade = currentHotelReviews.reduce((sum, r) => sum += r.grade, 0) / currentHotelReviews.length;
                    realGrade = grade;
                }
                if(realGrade < parseFloat(ratingMassive[currentRating])){
                    return;
                }
            }
            if(freebiesMassive.length !== 0 && currentFreebies.length !== 0){
                if(!currentFreebies.every(freebie => h.amenities.items.includes(freebiesMassive[freebie])))
                    return
            }
            if(amenitiesMassive.length !== 0 && currentAmenities.length !== 0){
                if(!currentAmenities.every(amenitie => h.amenities.items.includes(amenitiesMassive[amenitie])))
                    return
            }
            if(currentPrice.from !== -1 && currentPrice.to !== -1){
                const checkedPrice = Math.min(...h.rooms.map(room => transformPrice(room.price)));
                if(checkedPrice < currentPrice.from || checkedPrice > currentPrice.to) return;
            }

            if(cities.length !== 0){
                const neededLocation = cities.find(c => (c as FetchedState<ShortLocation>).id === h.id) as FetchedState<ShortLocation>;
                if(destination !== undefined){
                    const inputedCity = destination.split("+")[0];
                    if(inputedCity !== neededLocation.value.city) return;
                } else if(cityOrCountry !== undefined) {
                    if(cityOrCountry.replace("-", " ") !== neededLocation.value.city && 
                    cityOrCountry.replace("-", " ") !== neededLocation.value.country) 
                        return;
                }
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

            futureMassive.push(h);
        });
        filtredMassive = [...futureMassive];

        const hotelsCount = filtredMassive.filter(h => h.type === HOTEL_TYPE.hotels).length;
        const motelsCount = filtredMassive.filter(h => h.type === HOTEL_TYPE.motels).length;
        const resortsCount = filtredMassive.filter(h => h.type === HOTEL_TYPE.resorts).length;

        filtredMassive = [...filtredMassive].filter(hotel => hotel.type === activeCategory);

        return { hotelsCount, motelsCount, resortsCount, filtredMassive };
    }, [navbarFiltersState, activeCategory, massive, cities, location]);
}