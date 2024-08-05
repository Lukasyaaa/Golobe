import React, { FC, useRef } from "react";
import { useTypedSelector } from "../../../../hooks/redux";
import { SortVariant } from "./SortVariant";
import { SortSelect } from "./SortSelect";
import { sortFlights, sortHotels, contentPart } from "../../../../types";

interface flightsSortProps{
    sortStore : sortFlights,
    sortType : contentPart.Flights
}
interface hotelsSortProps{
    sortStore : sortHotels,
    sortType : contentPart.Hotels
}

export const Sort : FC<flightsSortProps | hotelsSortProps> = ({sortStore, sortType}) =>{
    const parent = useRef<HTMLDivElement>(null)

    if(sortType === contentPart.Flights){
        return(
            <div className="sort" ref={parent}>
                {Array.from({ length: Math.min(sortStore.items.length, 3) }, (_, i) => (
                    <SortVariant 
                        key={i} 
                        about={sortStore.items[i]} isActive={sortStore.activeItem === i} 
                        ourParent={parent} id={i} valueType={contentPart.Flights}
                    />
                ))}
                {sortStore.items.length > 3 && 
                    <SortSelect 
                        isActive={sortStore.isActive} 
                        links={sortStore.items.filter((_, index) => index > 2)} valueType={contentPart.Flights}
                    />
                }
            </div>
        )
    }

    return(
        <div className="sort" ref={parent}>
            {Array.from({ length: Math.min(sortStore.items.length, 3) }, (_, i) => (
                <SortVariant key={i} 
                    about={sortStore.items[i]} isActive={sortStore.activeItem === i} 
                    ourParent={parent} id={i} valueType={contentPart.Hotels}
                />
            ))}
            {sortStore.items.length > 3 && 
                <SortSelect 
                    isActive={sortStore.isActive} 
                    links={sortStore.items.filter((_, index) => index > 2)} valueType={contentPart.Hotels}
                />
            }
        </div>
    )
}