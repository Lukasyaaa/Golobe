import React, { useEffect, useState, type FC } from "react"
import { SectionHeader } from "../../Common/SectionHeader.tsx"
import { useAppDispatch, useTypedSelector } from "../../../store";
import { fetchMap } from "../../../store/flights";
import { Submap } from "./Submap.tsx";
import type { Submap as SubmapType } from "../../../types.ts";

export const Map : FC = () => {
    const about = useTypedSelector(state => state.flights.start.map);
    let [visibleItems, setVisibleItems] = useState<SubmapType[]>([]);
    const dispatch = useAppDispatch();
    let isAll = useState<boolean>(false);

    const {isLoading, error, header, items, maxShow} = about;

    useEffect(() => {
        dispatch(fetchMap());
    }, [dispatch]);

    useEffect(() => {
        if(window.innerWidth <= 1145 && window.innerWidth > 992){
            setVisibleItems(items.filter(submap => submap.place !== "Japan"));
        } else {
            setVisibleItems(items);
        }
    }, [items]);

    if(isLoading){
        return <h1>Is Loading...</h1>
    }
    if(error !== null){
        return <h1>Some Error</h1>
    }

    return(
        <section className="map">
            <div className="container">
                <SectionHeader 
                    about={header} parentCl="map" isAll={isAll} isNeedButton={maxShow < items.length}
                />
                {(isAll[0]) 
                    ? <div className="map__items">
                        <div className="map__items-inner">
                            {items.map((submap, i) => <Submap key={i} {...submap} /> )}
                        </div>
                    </div>
                    : <div 
                        className={["map__items", (window.innerWidth > 992) ? "positioned" : ""].filter(Boolean).join(" ")}
                    >
                        <div className="map__items-inner">
                            {visibleItems.slice(0, maxShow).map((submap, i) => <Submap key={i} {...submap} />)}
                        </div>
                    </div>
                }
            </div>
        </section>
    )
}