import React, { useEffect, useState, type FC } from "react";
import { SITE_PARTS } from "../../../../types";
import type {objType, SectionWithHeader, Travel as TravelType} from "../../../../types";
import { SectionHeader } from "../../Blocks/SectionHeader";
import { useAppDispatch } from "../../../../store";
import { fetchTravels as fetchTravelsFlights } from "../../../../store/flights";
import { fetchTravels as fetchTravelsHotels } from "../../../../store/hotels";
import { Travel } from "./Travel";

interface TravelsProps{
    about: SectionWithHeader<TravelType>,
    type: objType<typeof SITE_PARTS> 
}

export const Travels : FC<TravelsProps> = ({about, type}) => {
    let [isAll, setIsAll] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const {header, items, isLoading, error, maxShow} = about;

    useEffect(() => {
        if(type === SITE_PARTS.flights){
            dispatch(fetchTravelsFlights());
        } else {
            dispatch(fetchTravelsHotels());
        }
    }, [dispatch]);

    if(isLoading){
        return(
            <section className="travels">
                <div className="container">
                    <h1 className="loading message">Loading...</h1>
                </div>
            </section>
        )
    }
    if(error !== null){
        return(
            <section className="travels">
                <div className="container">
                    <h1 className="error message">Some Error...</h1>
                </div>
            </section>
        )
    }

    return(
        <section className="travels">
            <div className="container">
                <SectionHeader 
                    about={header} parentCl="travels" isNeedButton={maxShow > items.length}
                    isAll={[isAll, setIsAll]}
                />
            </div>
            <div className="travels__items">
                {items.map((travel, i) => <Travel key={i} {...travel} />)}
            </div>
        </section>
    )
}