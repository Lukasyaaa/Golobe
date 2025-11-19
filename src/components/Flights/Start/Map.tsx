import React, { useEffect, useState, type FC } from "react"
import { SectionHeader } from "../../Common/Blocks/SectionHeader.tsx"
import { useAppDispatch, useTypedSelector } from "../../../store";
import { fetchMap } from "../../../store/flights";
import { Submap } from "./Submap.tsx";
import type { Submap as SubmapType } from "../../../types.ts";

export const Map : FC = () => {
    const about = useTypedSelector(state => state.flights.start.map);
    let [visibleItems, setVisibleItems] = useState<SubmapType[]>([]);
    let [isAll, setIsAll] = useState<boolean>(false);

    const {isLoading, error, items} = about;
    const headerAbout = {
        heading: "Let's go places together", 
        description: "Discover the latest offers and news and start planning your next trip with us.", 
        button: {active: "See All", disable: "Hide"}
    };
    const maxShow = 5;

    const dispatch = useAppDispatch();
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
        return(
            <section className="map">
                <div className="container">
                    <h1 className="loading message">Loading...</h1>
                </div>
            </section>
        )
    }
    if(error !== null){
        return(
            <section className="map">
                <div className="container">
                    <h1 className="error message">Some Error...</h1>
                </div>
            </section>
        )
    }

    return(
        <section className="map">
            <div className="container">
                <SectionHeader 
                    about={headerAbout} parentCl="map" isAll={[isAll, setIsAll]} isNeedButton={maxShow < items.length}
                />
                {(isAll) 
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