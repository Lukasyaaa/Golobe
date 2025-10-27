import React, { useEffect, useState, type FC } from "react"
import { SectionHeader } from "../SectionHeader"
import { useAppDispatch } from "../../../store";
import { fetchOffers } from "../../../store/flights";
import { Offer } from "./Offer";
import type { Offer as OfferType, Section } from "../../../types";

export const Offers : FC<Section<OfferType>> = ({isLoading, error, header, items, maxShow}) => {
    const dispatch = useAppDispatch();
    let isAll = useState<boolean>(false);

    useEffect(() => {
        dispatch(fetchOffers());
    }, [dispatch]);

    if(isLoading){
        return <h1>Is Loading...</h1>
    }
    if(error !== null){
        return <h1>Some Error</h1>
    }

    return(
        <section className="offers">
            <div className="container">
                <SectionHeader 
                    about={header} parentCl="offers" isAll={isAll} isNeedButton={maxShow < items.length}
                />
                <div className="offers__items">
                    {(isAll[0] ? items : items.slice(0, maxShow)).map((offer, i) =>
                        <Offer key={i} {...offer} />
                    )}
                </div>
            </div>
        </section>
    )
}