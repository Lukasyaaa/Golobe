import React, { FC, Fragment, useRef, useState } from "react";
import { contentPart } from "../../../types";
import { useTypedSelector } from "../../../useTypedSelector";
import { SortCategory } from "./SortCategory";
import { SortMore } from "./SortMore";

interface sortProps{
    displayedFilters : contentPart
}

export const Sort : FC<sortProps> = ({displayedFilters}) => {
    let store  = useTypedSelector(state => state.configurate.sort);
    let [isActive, setIsActive] = useState<boolean>(false);
    let classes = ["sort"];

    let container = useRef<HTMLDivElement>(null); 

    if(isActive){
        classes.push("_active");
    }

    if(displayedFilters === contentPart.Flights){
        if(store.flights.items.length !== 0){
            return(
                <div className={classes.join(" ") + " flights__sort sort-flights"} ref={container}>
                    {store.flights.items.slice(0, store.flights.maxShow).map((category, i) => 
                        <SortCategory 
                            contentType={contentPart.Flights} value={category} isActive={store.flights.currentActive === i} 
                            id={i} key={i} containerRef={container}
                        />)
                    }
                    {store.flights.items.length > store.flights.maxShow && 
                        <SortMore 
                            title={store.buttonShowMore} contentType={contentPart.Flights} 
                            value={store.flights.items.slice(store.flights.maxShow)} isActive={{value: isActive, set: setIsActive}}
                        />
                    }
                </div>
            )
        }
    }else{
        if(store.hotels.items.length !== 0){
            return(
                <div className={classes.join(" ") + " hotels__sort sort-hotels"} ref={container}>
                    {store.hotels.items.slice(0, store.hotels.maxShow).map((category, i) => 
                        <SortCategory 
                            contentType={contentPart.Hotels} value={category} isActive={store.hotels.currentActive === i} 
                            id={i} key={i} containerRef={container}
                        />)
                    }
                    {store.hotels.items.length > store.hotels.maxShow && 
                        <SortMore 
                            title={store.buttonShowMore} contentType={contentPart.Hotels} 
                            value={store.hotels.items.slice(store.hotels.maxShow)} isActive={{value: isActive, set: setIsActive}}
                        />
                    }
                </div>
            )
        }
    }
    return <Fragment />
}