import React, { useEffect, useState, type FC } from "react";
import type { Section, Travel as TravelType } from "../../../types";
import { SectionHeader } from "../SectionHeader";
import { useAppDispatch } from "../../../store";
import { fetchTravels } from "../../../store/flights";
import { Travel } from "./Travel";


export const Travels : FC<Section<TravelType>> = ({header, items, isLoading, error, maxShow}) => {
    let isAll = useState<boolean>(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchTravels());
    }, [dispatch]);

    if(isLoading){
        return <h1>Is Loading...</h1>
    }
    if(error !== null){
        return <h1>Some Error</h1>
    }

    return(
        <section className="travels">
            <div className="container">
                <SectionHeader 
                    about={header} parentCl="travels" isNeedButton={maxShow > items.length}
                    isAll={isAll}
                />
            </div>
            <div className="travels__items">
                {items.map((travel, i) => <Travel key={i} {...travel} />)}
            </div>
        </section>
    )
}