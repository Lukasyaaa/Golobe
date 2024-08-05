import React, {FC, useRef} from "react";
import { contentPart, sortFlightsVariant, sortHotelsVariant } from "../../../../types";
import { SortSelectLink } from "./SortSelectLink";
import { useDispatch } from "react-redux";
import { sortHideActive, sortShowActive } from "../../../../store/common/sortReducer";

interface flightsSortSelectProps{
    links : sortFlightsVariant[];
    isActive : boolean,
    valueType : contentPart.Flights
}

interface hotelsSortSelectProps{
    links : sortHotelsVariant[];
    isActive : boolean,
    valueType : contentPart.Hotels
}

export const SortSelect : FC<flightsSortSelectProps | hotelsSortSelectProps> = ({links, isActive, valueType}) =>{
    let listInner = useRef<HTMLUListElement>(null);
    const dispatch = useDispatch();

    const showList = () => {
        dispatch(sortShowActive(valueType));
    }
    const hideList = () => {
        dispatch(sortHideActive(valueType));
    }

    return(
        <div className="sort__more more-sort">
            <button className="more-sort__opener" onClick={(e) => {e.stopPropagation(); (isActive) ? hideList() : showList()}}>
                <div className="more-sort__burger">
                    <span></span>
                </div>
                <span>Other sort</span>
            </button>
            <div className="more-sort__list" style={{height: (isActive) ? listInner.current?.offsetHeight : 0}}>
                <ul className="more-sort__list-inner" ref={listInner}>
                    {(valueType === contentPart.Flights) ? 
                        links.map((link : sortFlightsVariant, i : number) => 
                            <SortSelectLink 
                                key={i} 
                                about={link} maxId={links.length - 1 + 3} id={i + 3} appearList={showList} hideList={hideList}
                                valueType={contentPart.Flights}
                            />
                        ) :
                        links.map((link : sortHotelsVariant, i : number) => 
                            <SortSelectLink 
                                key={i} 
                                about={link} maxId={links.length - 1 + 3} id={i + 3} appearList={showList} hideList={hideList}
                                valueType={contentPart.Hotels}
                            />
                        )
                    }
                </ul>
            </div>
        </div>
    )
}