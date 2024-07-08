import React from "react";
import { useTypedSelector } from "../../hooks/redux";
import { sectionHeaderItems, tripVariantsItem } from "../../types";
import { BlockHeader } from "../Common/BlockHeader";
import { TripVariant } from "./TripVariant";

export const TripVariants = () =>{
    const tripVariantsStore = useTypedSelector<sectionHeaderItems<tripVariantsItem>>(store => store.start.tripVariants);

    return(
        <section className="trip-variants">
            <div className="container">
                <BlockHeader parent="trip-variants" text={tripVariantsStore.header} />
                <div className="trip-variants__items">
                    {tripVariantsStore.items.map((tripVariant, tripVariantIndex) => 
                        <TripVariant key={tripVariantIndex} about={tripVariant}/>
                    )}
                </div>
            </div>
        </section>
    )
}