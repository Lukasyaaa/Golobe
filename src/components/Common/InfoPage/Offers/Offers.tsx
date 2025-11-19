import React, { useEffect, useState, type FC } from "react"
import { SectionHeader } from "../../Blocks/SectionHeader"
import { useAppDispatch } from "../../../../store";
import { fetchOffers as fetchOffersFlights } from "../../../../store/flights";
import { fetchOffers as fetchOffersHotels } from "../../../../store/hotels";
import { Offer } from "./Offer";
import { type objType, type Offer as OfferType, type SectionWithHeader, SITE_PARTS } from "../../../../types";

interface OffersProps{
    about: SectionWithHeader<OfferType>,
    type: objType<typeof SITE_PARTS> 
}

export const Offers : FC<OffersProps> = ({about, type}) => {
    const dispatch = useAppDispatch();
    const {header, items, isLoading, error, maxShow} = about;
    let [isAll, setIsAll] = useState<boolean>(false);

    useEffect(() => {
        if(type === SITE_PARTS.flights){
            dispatch(fetchOffersFlights());
        } else {
            dispatch(fetchOffersHotels());
        }
    }, [dispatch]);

    if(isLoading){
        return(
            <section className="offers">
                <div className="container">
                    <h1 className="loading message">Loading...</h1>
                </div>
            </section>
        )
    }
    if(error !== null){
        return(
            <section className="offers">
                <div className="container">
                    <h1 className="error message">Some Error...</h1>
                </div>
            </section>
        )
    }

    return(
        <section className="offers">
            <div className="container">
                <SectionHeader 
                    about={header} parentCl="offers" isAll={[isAll, setIsAll]} 
                    isNeedButton={maxShow < items.length}
                />
                <div className="offers__items">
                    {(isAll ? items : items.slice(0, maxShow)).map((offer, i) =>
                        <Offer key={i} {...offer} />
                    )}
                </div>
            </div>
        </section>
    )
}