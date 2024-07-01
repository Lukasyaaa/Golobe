import React from "react";
import { useTypedSelector } from "../../hooks/redux";
import { sectionHeaderItems, tripVariantsItem } from "../../types";
import { BlockHeader } from "../Common/BlockHeader";
import { TripVariant } from "./TripVariant";

export const TripVariants = () =>{
    const tripVariants = useTypedSelector<sectionHeaderItems<tripVariantsItem>>(store => store.another.tripVariants);

    return(
        <section className="trip-variants">
            <div className="container">
                <BlockHeader parent="trip-variants" text={tripVariants.header} />
                <div className="trip-variants__items">
                    {tripVariants.items.map((tripVariant, tripVariantIndex) => 
                        <TripVariant 
                            key={tripVariantIndex} 
                            info={{title: tripVariant.title, features: tripVariant.features}} 
                            href={tripVariant.href}
                            image={tripVariant.image}
                        />
                    )}
                </div>
            </div>
        </section>
    )
}