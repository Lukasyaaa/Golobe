import { useEffect, useMemo } from "react";
import { AMENITIES, FREEBIES, HOTEL_TYPE, HOTELS_SORT_TYPE, NAVBAR_DESCRIPTION, NAVBAR_ITEM, SITE_PARTS, transformPrice, type Flight, type Hotel, type NavbarFilter, type NavbarRangeValue, type objType } from "../types";
import type { NavbarFilterState } from "../pages/Catalog";

export const useHotels = (
    massive: Hotel[], navbarFilters: NavbarFilter[],
    navbarFiltersState: NavbarFilterState[], activeCategory: objType<typeof HOTELS_SORT_TYPE>, 
    contentType: objType<typeof SITE_PARTS>,
) => {
    return useMemo(() => {
        if(contentType === SITE_PARTS.flights){
            return { hotelsCount: -1, motelsCount: -1, resortsCount: -1, filtredMassive: [] }
        }
        let filtredMassive = [...massive];

        let ratingMassive: string[] = [];
        let freebiesMassive: objType<typeof FREEBIES>[] = [];
        let amenitiesMassive: objType<typeof AMENITIES>[] = [];
        navbarFilters.forEach(({type, description, value}) => {
            if(type === NAVBAR_ITEM.radios){
                if(description === NAVBAR_DESCRIPTION.rating){
                    ratingMassive = [...value];
                }
            } else if(type === NAVBAR_ITEM.checkboxes){
                if(description === NAVBAR_DESCRIPTION.freebies){
                    freebiesMassive = [...value as objType<typeof FREEBIES>[]];
                } else if(description === NAVBAR_DESCRIPTION.amenities){
                    amenitiesMassive = [...value as objType<typeof AMENITIES>[]];
                }
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

        const hotelsCount = filtredMassive.filter(h => h.type === HOTEL_TYPE.hotels).length;
        const motelsCount = filtredMassive.filter(h => h.type === HOTEL_TYPE.motels).length;
        const resortsCount = filtredMassive.filter(h => h.type === HOTEL_TYPE.resorts).length;

        filtredMassive = [...(filtredMassive as Hotel[]).filter(hotel => hotel.type === activeCategory)];

        return { hotelsCount, motelsCount, resortsCount, filtredMassive };
    }, [navbarFiltersState, activeCategory, massive]);
}