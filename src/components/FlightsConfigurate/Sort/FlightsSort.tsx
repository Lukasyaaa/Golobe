import React, { FC, Fragment, useRef } from "react";
import { useTypedSelector } from "../../../hooks/redux";
import { FlightsSortVariant } from "./FlightsSortVariant";
import { FlightsSortSelect } from "./FlightsSortSelect";


export const FlightsSort : FC = () =>{
    const optionsFlightsStore = useTypedSelector(store => store.optionsFlights);
    const parent = useRef<HTMLDivElement>(null)

    return(
        <div className="flights-options" ref={parent}>
            {Array.from({ length: Math.min(optionsFlightsStore.items.length, 3) }, (_, i) => (
                <FlightsSortVariant key={i} 
                    about={optionsFlightsStore.items[i]} isActive={optionsFlightsStore.activeItem === i + 1} 
                    ourParent={parent} id={i + 1}
                />
            ))}
            {optionsFlightsStore.items.length > 3 && 
                <FlightsSortSelect 
                    isActive={optionsFlightsStore.isActive} 
                    links={optionsFlightsStore.items.filter((_, index) => index > 2)} 
                />
            }
        </div>
    )
}