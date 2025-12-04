import { useEffect, useState, type FC } from "react";
import { SITE_PARTS } from "../../../../types";
import type {objType, SectionWithHeader, Travel as TravelType} from "../../../../types";
import { SectionHeader } from "../../Blocks/SectionHeader";
import { useAppDispatch } from "../../../../store";
import { fetchTravels as fetchTravelsFlights } from "../../../../store/flights";
import { fetchTravels as fetchTravelsHotels } from "../../../../store/hotels";
import { Travel } from "./Travel";

interface TravelsProps extends SectionWithHeader<TravelType>{
    type: objType<typeof SITE_PARTS> 
}

export const Travels : FC<TravelsProps> = ({header, items, isLoading, error, maxShow, type}) => {
    let [isAll, setIsAll] = useState<boolean>(false);
    const dispatch = useAppDispatch();

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
                    about={header} parentCl="travels" isAll={[isAll, setIsAll]}
                    isNeedButton={maxShow > items.length}
                />
            </div>
            <div className="travels__items">
                {(isAll ? items : items.slice(0, maxShow)).map((travel, i) => 
                    <Travel key={i} {...travel} />
                )}
            </div>
        </section>
    )
}